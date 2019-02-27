import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../models/book';

@Component({
  selector: 'app-bookform',
  templateUrl: './bookform.component.html',
  styleUrls: ['./bookform.component.css']
})
export class BookformComponent implements OnInit {

  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      title: [this.data.title, [Validators.required]],
      author: [this.data.author, [Validators.required]],
      publisher: [this.data.publisher, [Validators.required]],
      pages: [this.data.pages, [Validators.required, Validators.min(0)]],
      copies: [this.data.copies, [Validators.required, Validators.min(0)]],
      year: [this.data.year, [Validators.required, Validators.min(0)]]
    })
  }

  onSubmit() {
    if (this.bookForm.valid) {
      if (this.data.id === 0) {
        const book = new Book(0,
        this.bookForm.value.title,
        this.bookForm.value.author,
        this.bookForm.value.year,
        this.bookForm.value.publisher,
        this.bookForm.value.pages,
        this.bookForm.value.copies);
        this.dialogRef.close(book);
      } else {
        this.data.title = this.bookForm.value.title;
        this.data.author = this.bookForm.value.author;
        this.data.year = this.bookForm.value.year;
        this.data.publisher = this.bookForm.value.publisher;
        this.data.pages = this.bookForm.value.pages;
        this.data.copies = this.bookForm.value.copies;
        this.dialogRef.close(this.data);
      }
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
