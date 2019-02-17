import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private refreshSource: Subject<boolean> = new Subject();
  public refreshStream: Observable<boolean> = this.refreshSource.asObservable();

  public cards: Card[] = [
    new Card(1, 1, 1, new Date(new Date().setDate(new Date().getDate() - 3)), null),
    new Card(2, 2, 3, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(3, 3, 2, new Date(new Date().setDate(new Date().getDate() - 2)), null),
    new Card(4, 4, 4, new Date(new Date().setDate(new Date().getDate() - 1)), new Date()),
    new Card(5, 4, 4, new Date(new Date().setDate(new Date().getDate() - 1)), new Date()),
    new Card(6, 4, 3, new Date(new Date().setDate(new Date().getDate() - 1)), new Date()),
    new Card(7, 2, 3, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(8, 2, 6, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(9, 2, 7, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(10, 2, 8, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(11, 2, 5, new Date(new Date().setDate(new Date().getDate() - 4)), null),
    new Card(12, 1, 1, new Date(new Date().setDate(new Date().getDate() - 3)), null),
    new Card(13, 2, 3, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(14, 6, 4, new Date(new Date().setDate(new Date().getDate() - 1)), new Date()),
    new Card(15, 5, 4, new Date(new Date().setDate(new Date().getDate() - 1)), new Date()),
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
  
  setReturnDate(cardId: number) {
    this.getCard(cardId).dateReturn = new Date();
    this.refreshSource.next(true);
  }
}
