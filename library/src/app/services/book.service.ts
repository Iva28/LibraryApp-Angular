import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private refreshSource: Subject<boolean> = new Subject();
  public refreshStream: Observable<boolean> = this.refreshSource.asObservable();

  public books: Book[] = [
    new Book(1, 'Book 1', 'Author 1', 2001, 'Publisher 1', 900, 7),
    new Book(2, 'Book 5', 'Author 2', 2002, 'Publisher 2', 200, 5),
    new Book(3, 'Book 3', 'Author 5', 2003, 'Publisher 3', 300, 4),
    new Book(4, 'Book 2', 'Author 4', 2004, 'Publisher 4', 400, 3),
    new Book(5, 'Book 7', 'Author 3', 2005, 'Publisher 5', 500, 0),
    new Book(6, 'Book 4', 'Author 6', 2006, 'Publisher 6', 500, 12),
    new Book(7, 'Book 6', 'Author 7', 2007, 'Publisher 7', 500, 11)
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
    book.id = this.books.length + 1;
    this.books.push(book);
    this.refreshSource.next(true);
  }

  reduceNumberOfCopies(bookId: number) {
    this.getBook(bookId).copies--;
  }

  increaseNumberOfCopies(bookId: number) {
    this.getBook(bookId).copies++;
  }
}
