import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  public cards: Card[];

  private refreshSource: Subject<boolean> = new Subject();
  public refreshStream: Observable<boolean> = this.refreshSource.asObservable();

  constructor() {
    if (!localStorage.getItem('cards')) {
      this.cards = [
        new Card(1, 1, 6, new Date(new Date().setDate(new Date().getDate()-6)), null),
        new Card(2, 2, 2, new Date(new Date().setDate(new Date().getDate()-4)), new Date(new Date().setDate(new Date().getDate()-2))),
        new Card(3, 2, 3, new Date(new Date().setDate(new Date().getDate()-3)), new Date(new Date().setDate(new Date().getDate()-1))),
        new Card(4, 5, 4, new Date(new Date().setDate(new Date().getDate()-4)), new Date(new Date().setDate(new Date().getDate()-2))),
        new Card(5, 5, 5, new Date(new Date().setDate(new Date().getDate()-7)), null),
        new Card(6, 5, 6, new Date(new Date().setDate(new Date().getDate()-4)), new Date(new Date().setDate(new Date().getDate()-1))),
        new Card(7, 7, 7, new Date(new Date().setDate(new Date().getDate()-3)), null),
        new Card(8, 1, 4, new Date(new Date().setDate(new Date().getDate()-4)), new Date()),
        new Card(9, 1, 5, new Date(new Date().setDate(new Date().getDate()-2)), null),
        new Card(10, 1, 6, new Date(new Date().setDate(new Date().getDate()-4)), new Date()),
        new Card(11, 1, 7, new Date(new Date().setDate(new Date().getDate()-8)), null),
        new Card(12, 7, 7, new Date(new Date().setDate(new Date().getDate()-2)), null),
        new Card(13, 3, 4, new Date(new Date().setDate(new Date().getDate()-6)), new Date(new Date().setDate(new Date().getDate()-1))),
        new Card(14, 4, 5, new Date(new Date().setDate(new Date().getDate()-5)), null),
        new Card(15, 1, 6, new Date(new Date().setDate(new Date().getDate()-10)), new Date(new Date().setDate(new Date().getDate()-5))),
        new Card(16, 6, 7, new Date(new Date().setDate(new Date().getDate()-1)), null),
        new Card(17, 2, 7, new Date(new Date().setDate(new Date().getDate()-1)), null)
      ];
      localStorage.setItem('cards', JSON.stringify(this.cards));
    } else {
      this.cards = JSON.parse(localStorage.getItem('cards'));
    }
   }

  getCards() {
    return this.cards;
  }

  getCard(id: number) {
    return this.cards.find((c) => c.id === id);
  } 

  addCard(card: Card) {
    card.id = this.cards.length + 1;
    this.cards.push(card);
    localStorage.setItem('cards', JSON.stringify(this.cards));
    this.refreshSource.next(true);
  }
  
  setReturnDate(cardId: number) {
    this.getCard(cardId).dateReturn = new Date();
    localStorage.setItem('cards', JSON.stringify(this.cards));
    this.refreshSource.next(true);
  }
}
