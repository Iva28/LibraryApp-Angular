import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Visitor } from '../models/visitor';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  private refreshSource: Subject<boolean> = new Subject();
  public refreshStream: Observable<boolean> = this.refreshSource.asObservable();
  
  public visitors: Visitor[] = [
    new Visitor(1, 'Visitor 3', '123-456-789'),
    new Visitor(2, 'Visitor 1', '453-112-555'),
    new Visitor(3, 'Visitor 5', '123-565-767'),
    new Visitor(4, 'Visitor 2', '898-456-444'),
    new Visitor(5, 'Visitor 4', '222-456-022')
  ];
  
  constructor() { }
  
  getVisitors() {   
    return this.visitors;
  }

  getVisitor(id: number) {
    return this.visitors.find((b) => b.id === id);
  }

  editVisitor(visitor: Visitor) {
    const v = this.getVisitor(visitor.id);
    v.name = visitor.name;
    v.phone = visitor.phone;
    this.refreshSource.next(true);
  }

  addVisitor(visitor: Visitor) {  
    visitor.id = this.visitors.length + 1;
    this.visitors.push(visitor);
    this.refreshSource.next(true);
  }
}
