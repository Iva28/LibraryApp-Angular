import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private refreshSource: Subject<boolean> = new Subject();
  public refreshStream: Observable<boolean> = this.refreshSource.asObservable();

  curDate = new Date();

  public cards: Card[] = [
    new Card(1, 1, 1, new Date(this.curDate.setDate(this.curDate.getDate() - 4)), null),
    new Card(1, 1, 1, new Date(this.curDate.setDate(this.curDate.getDate() - 2)), new Date()),
    new Card(1, 1, 1, new Date(this.curDate.setDate(this.curDate.getDate() - 5)), null),
    new Card(1, 1, 1, new Date(this.curDate.setDate(this.curDate.getDate() - 7)), new Date())
  ];
  
  constructor() { }

  getCards() {
    return this.cards;
  }

  getCard(id: number) {
    return this.cards.find((c) => c.id === id);
  } 

  addCard(card: Card) {
    card.id = this.cards.length + 1;
    this.cards.push(card);
    this.refreshSource.next(true);
  }
  
  setReturnDate(id: number) {
    this.getCard(id).dateReturn = new Date();
  }



}
