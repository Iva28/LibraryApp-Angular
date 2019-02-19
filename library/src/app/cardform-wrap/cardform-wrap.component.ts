import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardService } from '../services/card.service';
import { Router } from '@angular/router';
import { Card } from '../models/card';
import { CardformComponent } from '../cardform/cardform.component';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-cardform-wrap',
  template: '',
  styles: ['']
})
export class CardformWrapComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private cardService: CardService, 
    private bookService: BookService,
    private router: Router) { }

  ngOnInit() {
    
    let card = new Card(0, 0, 0, new Date(), null);
    
    setTimeout(() => {
      let dialogRef = this.dialog.open(CardformComponent, { data: card });      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.cardService.addCard(result);
          this.bookService.reduceNumberOfCopies(result.bookID);
        }
        this.router.navigate(['cards']);
      });
    });
  }
}
