import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import {Observable, BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private refreshSource: Subject<boolean> = new Subject();
  public refreshStream: Observable<boolean> = this.refreshSource.asObservable();

  public books: Book[] = [
    new Book(1, 'A', 'Author 1', 2001, 'Publisher 1', 100, 5),
    new Book(2, 'B', 'Author 2', 2002, 'Publisher 2', 200, 7),
    new Book(3, 'E', 'Author 3', 2003, 'Publisher 3', 300, 4),
    new Book(4, 'C', 'Author 4', 2004, 'Publisher 4', 400, 3),
    new Book(5, 'D', 'Author 5', 2005, 'Publisher 5', 500, 10)
  ];

  constructor() { }

  getBooks() {
    return this.books;
  }

  getBook(id: number) {
    return this.books.find((b) => b.id === id);
  }

  deleteBook(book: Book){
    const index = this.books.indexOf(book);
    this.books.splice(index, 1);
    this.refreshSource.next(true);
  }
  
  editBook(book: Book){
    const b = this.getBook(book.id);
    b.title = book.title;
    b.author = book.author;
    b.copies = book.copies;
    b.pages = book.pages;
    b.publisher = book.publisher;
    b.year = book.year;
    this.refreshSource.next(true);
  }

  addBook(book: Book) {
    this.books.push(book);
    this.refreshSource.next(true);
  }
}
