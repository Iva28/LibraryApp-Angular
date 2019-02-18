import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';
import { BookService } from '../services/book.service';
import { VisitorService } from '../services/visitor.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  cards: Card[];
  books: Array<any> = [];
  visitors: Array<any> = [];

  constructor(private cardService: CardService, private bookService: BookService, private visitorService: VisitorService) { }

  ngOnInit() {
    this.cards = this.cardService.getCards();
    this.getTopFiveBooks();
    this.getTopFiveVisitors();
  }

  getTopFiveBooks() {
    const counts = {};
    this.cards.forEach( (c) => { counts[c.bookID] = (counts[c.bookID] || 0) + 1; });
    const props = Object.keys(counts).map(function(key) { return { key, value: this[key] }; }, counts);
    props.sort((a, b) => b.value - a.value);
    let topFive = props.slice(0, 5);
    topFive.forEach(el => {
      const book = this.bookService.getBook(+el.key);
      if (book != null) {
        const b = {title: book.title, count: +el.value};
        this.books.push(b);
      }
    });
  }

  getTopFiveVisitors() {
    const counts = {};
    this.cards.forEach( (c) => { counts[c.visitorID] = (counts[c.visitorID] || 0) + 1; });
    const props = Object.keys(counts).map(function(key) { return { key, value: this[key] }; }, counts);
    props.sort((a, b) => b.value - a.value);
    let topFive = props.slice(0, 5);
    topFive.forEach(el => {
      const visitor = this.visitorService.getVisitor(+el.key);
      if (visitor != null) {
        const v = {name: visitor.name, count: +el.value};
        this.visitors.push(v);
      }
    });
  }
}
