import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VisitorService } from '../services/visitor.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Visitor } from '../models/visitor';

@Component({
  selector: 'app-visitorform',
  templateUrl: './visitorform.component.html',
  styleUrls: ['./visitorform.component.css']
})
export class VisitorformComponent implements OnInit {

  visitorForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private visitorService: VisitorService,
    public dialogRef: MatDialogRef<VisitorformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Visitor) { }

  ngOnInit() {
    this.visitorForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      phone: [this.data.phone, [Validators.required, Validators.pattern('^[0-9-\s]*$')]]
    })
  }

  onSubmit() {
    if (this.visitorForm.valid) {
      if (this.data.id === 0) {
        const visitor = new Visitor(0,
        this.visitorForm.value.name,
        this.visitorForm.value.phone);
        this.dialogRef.close(visitor);
      } else {
        this.data.name = this.visitorForm.value.name;
        this.data.phone = this.visitorForm.value.phone;
        this.dialogRef.close(this.data);
      }
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}
