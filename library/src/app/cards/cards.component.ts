import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  cards: Card[];
  dataSource;
  displayedColumns = ['id', 'visitor', 'book', 'dateOut', 'dateReturn'];
  subscriptions: Subscription[] = [];
  sortTypes = ['', '', ''];

  constructor(private cardService: CardService, public dialog: MatDialog) {  
    this.subscriptions.push( this.cardService.refreshStream.subscribe(() => this.load()) );
  }
  ngOnInit() {
  }

  load() {
    this.cards = this.cardService.getCards();
    this.dataSource = new MatTableDataSource(this.cards);
  }
}
