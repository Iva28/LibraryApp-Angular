import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from '../services/book.service';
import { VisitorService } from '../services/visitor.service';
import { CardformComponent } from '../cardform/cardform.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  cards: Array<any> = [];
  dataSource;
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
    cs.forEach(c => {
      const book = this.bookService.getBook(c.bookID);     
      const visitor = this.visitorService.getVisitor(c.visitorID);
      const card = {id: c.id, visitor: visitor, book: book, dateOut: c.dateOut, dateReturn: c.dateReturn};
      this.cards.push(card);
      });
    this.dataSource = new MatTableDataSource(this.cards);
  }

  search(str: string) {
    let tmp = this.cards.slice();
    tmp = tmp.filter(function(c) {
      return c.visitor.name.includes(str) || c.book.title.includes(str);
    });
    this.dataSource = new MatTableDataSource(tmp);
  }

  setDateReturn(cardId: number) {
    this.cardService.setReturnDate(cardId);
    console.log('3: ' + this.cardService.getCard(3).dateReturn);
    console.log('this ' + this.cardService.getCard(cardId).dateReturn);
    console.log(this.selectedType);
    if (this.selectedType) {
      this.sort(this.selectedType);
    }
    const card = this.cardService.getCard(cardId);
    this.bookService.increaseNumberOfCopies(card.bookID);
  }

  sort(type: string) {
    let sortCards = this.cards.slice();
    this.selectedType = type;
    
    /* sortCards.sort(function(a, b) {
      if (type == 'Date Out')
        return (a.dateOut < b.dateOut) ? -1 : (b.dateOut > b.dateOut) ? 1 : 0;
      else if (type == 'Return Date')
        return (a.dateReturn > b.dateReturn) ? -1 : (b.dateReturn < b.dateReturn) ? 1 : 0;
    }); */
    
    /* sortCards.sort(function (a, b) {
      if (a.dateReturn === null)
          return 1;
      else if (b.dateReturn === null)
          return -1;
      else if (a.dateReturn === b.dateReturn)
          return 0;
      else
          return a.dateReturn < b.dateReturn ? -1 : 1;
    });*/

   sortCards.sort(function(a, b) {
    if (type == 'Date Out')
        return (a.dateOut < b.dateOut) ? -1 : (b.dateOut > b.dateOut) ? 1 : 0;
    else if (type == 'Return Date')
        return (a.dateReturn == null ? 1 : b.dateReturn == null ? -1 : (a.dateReturn < b.dateReturn) ? -1 : (b.dateReturn > b.dateReturn) ? 1 : 0)
    });

    this.dataSource = new MatTableDataSource(sortCards);
  }
}
