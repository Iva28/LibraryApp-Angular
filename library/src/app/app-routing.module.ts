import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { CardsComponent } from './cards/cards.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BookformWrapComponent } from './bookform-wrap/bookform-wrap.component';
import { VisitorformWrapComponent } from './visitorform-wrap/visitorform-wrap.component';
import { CardformWrapComponent } from './cardform-wrap/cardform-wrap.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent, children: [
    { path: 'edit/:id', component: BookformWrapComponent },
    { path: 'new', component: BookformWrapComponent },
  ] },
  { path: '', pathMatch: 'full', redirectTo: 'books'},
  { path: 'visitors', component: VisitorsComponent, children: [
    { path: 'edit/:id', component: VisitorformWrapComponent },
    { path: 'new', component: VisitorformWrapComponent },
  ]},
  { path: 'cards', component: CardsComponent, children: [
    { path: 'new', component: CardformWrapComponent },
  ]},
  { path: 'statistics', component: StatisticsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
