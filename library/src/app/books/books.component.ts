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
  sortTypes = ['copies', 'title', 'author'];

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

  sort(type: string) {
    let sortBooks = this.books.slice();
    sortBooks.sort(function(a, b) {
      if (type == 'copies') {
        return a.copies - b.copies;
      } else if (type == 'title') {
        return (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0;
      } else if (type == 'author') {
        return (a.author < b.author) ? -1 : (a.author > b.author) ? 1 : 0;
      }
    });
    this.dataSource = new MatTableDataSource(sortBooks);
  }

  search(str: string) {
    this.books = this.books.filter(function(b) {
      return b.author.includes(str) || b.title.includes(str) || b.publisher.includes(str) ;
    })
    this.dataSource = new MatTableDataSource(this.books);
  }
}
