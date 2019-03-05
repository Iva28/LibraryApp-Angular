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
  dataSource = new MatTableDataSource<any>();
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
    this.dataSource.data = this.books;
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
    this.dataSource.data = sortBooks;
  }
  
  search(str: string) {
    let tmp = this.books.slice();
    tmp = tmp.filter(function(b) {
      return b.author.toLowerCase().includes(str.toLowerCase()) || b.title.toLowerCase().includes(str.toLowerCase()) || b.publisher.toLowerCase().includes(str.toLowerCase()) ;
    })   
    this.dataSource.data = tmp;
  }
}