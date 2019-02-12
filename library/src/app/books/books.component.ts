import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit{

  books: Book[];
  dataSource;
  displayedColumns = ['id', 'title', 'author', 'year', 'publisher', 'pages', 'copies', 'actionEdit', 'actionDelete'];
  subscriptions: Subscription[] = [];

  constructor(private bookService: BookService, public dialog: MatDialog) {  
    this.subscriptions.push( this.bookService.refreshStream.subscribe(() => this.load()) );
  }
  
  ngOnInit() {
    this.load();
  }

  load() {
    this.books = this.bookService.getBooks();
    this.dataSource = new MatTableDataSource(this.books);
  }

  delete(book: Book) {
    this.bookService.deleteBook(book);
  }
}
