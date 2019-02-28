import { Component, OnInit, ViewChild } from '@angular/core';
import { CardService } from '../services/card.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from '../services/book.service';
import { VisitorService } from '../services/visitor.service';
import { Card } from '../models/card';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
import { MatFormFieldModule, MatInputModule } from '@angular/material';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  cards: Array<any> = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['id', 'visitor', 'book', 'dateOut', 'dateReturn'];
  subscriptions: Subscription[] = [];
  sortTypes = ['Date Out', 'Return Date'];
  selectedType: string;

  constructor(private cardService: CardService, private bookService: BookService, private visitorService: VisitorService, public dialog: MatDialog) {  
    this.subscriptions.push( this.cardService.refreshStream.subscribe(() => this.load()) );
  }

  ngOnInit() {
    this.load();
  }

  load() {
    const cs = this.cardService.getCards();
    while (this.cards.length) { this.cards.pop(); } 
    if (cs != null) {
      cs.forEach(c => {
        const book = this.bookService.getBook(c.bookID);     
        const visitor = this.visitorService.getVisitor(c.visitorID);
        const card = {id: c.id, visitor: visitor, book: book, dateOut: c.dateOut, dateReturn: c.dateReturn};
        this.cards.push(card);
      });
    }
    this.dataSource.data = this.cards;
  }

  search(str: string) {
    let tmp = this.cards.slice();
    tmp = tmp.filter(function(c) {
      return c.visitor.name.includes(str) || c.book.title.includes(str);
    });
    this.dataSource.data = tmp;
  }

  setDateReturn(cardId: number) {
    this.cardService.setReturnDate(cardId);
    if (this.selectedType) {
      this.sort(this.selectedType);
    }
    const card = this.cardService.getCard(cardId);
    this.bookService.increaseCopies(card.bookID);
  }

  sort(type: string) {
    this.selectedType = type;
    this.cards.sort(function(a, b) {
      if (type == 'Date Out')
          return (a.dateOut < b.dateOut) ? -1 : (b.dateOut > b.dateOut) ? 1 : 0;
      else if (type == 'Return Date')
          return (a.dateReturn == null ? 1 : b.dateReturn == null ? -1 : (a.dateReturn < b.dateReturn) ? -1 : (b.dateReturn > b.dateReturn) ? 1 : 0)
      });
      this.dataSource.data = this.cards;
    }
}