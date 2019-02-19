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
    new Card(1, 1, 6, new Date(new Date().setDate(new Date().getDate() - 3)), null),
    new Card(2, 2, 2, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(3, 2, 3, new Date(new Date().setDate(new Date().getDate() - 3)), new Date()),
    new Card(4, 5, 4, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(5, 5, 5, new Date(new Date().setDate(new Date().getDate() - 3)), null),
    new Card(6, 5, 6, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(7, 7, 7, new Date(new Date().setDate(new Date().getDate() - 3)), null),
    new Card(8, 1, 4, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(9, 1, 5, new Date(new Date().setDate(new Date().getDate() - 3)), null),
    new Card(10, 1, 6, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(11, 1, 7, new Date(new Date().setDate(new Date().getDate() - 3)), null),
    new Card(12, 7, 7, new Date(new Date().setDate(new Date().getDate() - 3)), null),
    new Card(13, 3, 4, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(14, 4, 5, new Date(new Date().setDate(new Date().getDate() - 3)), null),
    new Card(15, 1, 6, new Date(new Date().setDate(new Date().getDate() - 4)), new Date()),
    new Card(16, 6, 7, new Date(new Date().setDate(new Date().getDate() - 3)), null),
    new Card(17, 2, 7, new Date(new Date().setDate(new Date().getDate() - 3)), null)

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
