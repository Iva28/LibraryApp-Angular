import { Component, OnInit } from '@angular/core';
import { Visitor } from '../models/visitor';
import { Subscription } from 'rxjs';
import { VisitorService } from '../services/visitor.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {

  visitors: Visitor[];
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['id', 'name', 'phone','actionEdit'];
  subscriptions: Subscription[] = [];
  sortTypes = ['id', 'name'];

  constructor(private visitorService: VisitorService, public dialog: MatDialog) {  
    this.subscriptions.push( this.visitorService.refreshStream.subscribe(() => this.load()) );
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.visitors = this.visitorService.getVisitors();
    this.dataSource.data = this.visitors;
  }

  sort(type: string) {
    let sortVisitors = this.visitors.slice();
    sortVisitors.sort(function(a, b) {
      if (type == 'id') {
        return a.id - b.id;
      } else if (type == 'name') {
        return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
      }
    });
    this.dataSource.data = sortVisitors;
  }

  search(str: string) {
    let tmp = this.visitors.slice();
    tmp = tmp.filter(function(v) {
      return v.name.includes(str) || v.phone.includes(str);
    })
    this.dataSource.data = tmp;
  }
}
