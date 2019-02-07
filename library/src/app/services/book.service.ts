import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public books: Book[] = [
    new Book(1, 'Book 1', "Author 1", 2001, 'Publisher 1', 100, 5),
    new Book(2, 'Book 2', "Author 2", 2002, 'Publisher 2', 200, 7),
    new Book(3, 'Book 3', "Author 3", 2003, 'Publisher 3', 300, 4),
    new Book(4, 'Book 4', "Author 4", 2004, 'Publisher 4', 400, 3),
    new Book(5, 'Book 5', "Author 5", 2005, 'Publisher 5', 500, 10)
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
  }
  
  editBook(book: Book){
    const b = this.getBook(book.id);
    b.author = book.author;
    b.copies = b.copies;
    b.pages = book.pages;
    b.publisher = book.publisher;
    b.title = b.title;
    b.year = b.year;
  }
}
