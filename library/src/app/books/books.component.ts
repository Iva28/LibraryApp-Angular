import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { MatTableDataSource } from '@angular/material/table';
import { BookformComponent } from '../bookform/bookform.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  books: Book[];
  displayedColumns = ['id', 'title', 'author', 'year', 'publisher', 'pages', 'copies', 'actionEdit', 'actionDelete'];
  dataSource;

  constructor(private bookService: BookService, public dialog: MatDialog) { }
  
  ngOnInit() {
    this.books = this.bookService.getBooks();
    this.setDataSource();
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource(this.books);
  }

  delete(book: Book) {
    this.bookService.deleteBook(book);
    this.setDataSource();
  }

/*   edit(book: Book) {
    this.bookService.editBook(book);
  }
  
  OpenDialog() {
    let book = new Book(0, '', '', 0, '', 0, 0);
    let dialogRef = this.dialog.open(BookformComponent, {data: book});
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
      console.log(result);
    })
  } */
}
