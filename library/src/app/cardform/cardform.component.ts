import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../models/card';
import { BookService } from '../services/book.service';
import { VisitorService } from '../services/visitor.service';
import { Visitor } from '../models/visitor';
import { Book } from '../models/book';

@Component({
  selector: 'app-cardform',
  templateUrl: './cardform.component.html',
  styleUrls: ['./cardform.component.css']
})
export class CardformComponent implements OnInit {

  books: Book[];
  visitors: Visitor[];

  cardForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService, private visitorService: VisitorService,
     public dialogRef: MatDialogRef<CardformComponent>, @Inject(MAT_DIALOG_DATA) public data: Card) { }

  ngOnInit() {
    this.books = this.bookService.getBooks().filter(function(b) {return b.copies > 0; });
    this.visitors = this.visitorService.getVisitors();
    this.cardForm = this.fb.group({
      visitor: [this.data.visitorID, [Validators.required]],
      book: [this.data.bookID, [Validators.required]]
    })
  }

  onSubmit() {
    if (this.cardForm.valid) {
      const newCard = new Card(0, this.cardForm.value.visitor, this.cardForm.value.book, new Date(), null);
      this.dialogRef.close(newCard);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
