import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VisitorService } from '../services/visitor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Visitor } from '../models/visitor';
import { VisitorformComponent } from '../visitorform/visitorform.component';

@Component({
  selector: 'app-visitorform-wrap',
  template: '',
  styles: ['']
})
export class VisitorformWrapComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private visitorService: VisitorService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let visitor = new Visitor(0, '', '');

    this.route.params.forEach((params) => {
      const visId = +params['id'];
      if (!isNaN(visId)) {
        visitor = this.visitorService.getVisitor(visId);       
      }
    });
    
    setTimeout(() => {
      let dialogRef = this.dialog.open(VisitorformComponent, { data: visitor });      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(visitor);
          if (visitor.id == 0) {
            this.visitorService.addVisitor(result);
          } else {
            this.visitorService.editVisitor(result);
          }
        }
        this.router.navigate(['visitors']);
      });
    });
  }

}
