import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../models/book';
import { BookformComponent } from '../bookform/bookform.component';

@Component({
  selector: 'app-bookform-wrap',
  template: '',
  styles: ['']
})
export class BookformWrapComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private bookService: BookService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let book = new Book(0, '', '', 0, '', 0, 0);
    this.route.params.forEach((params) => {
      const bookId = +params['id'];
      if (!isNaN(bookId)) {
        book = this.bookService.getBook(bookId);       
      }
    });
    
    setTimeout(() => {
      let dialogRef = this.dialog.open(BookformComponent, { data: book });      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (book.id == 0) {
            this.bookService.addBook(result);
          } else {
            this.bookService.editBook(result);
          }
        }
        this.router.navigate(['books']);
      });
    });
  }
}
