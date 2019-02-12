import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { CardsComponent } from './cards/cards.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BookformComponent } from './bookform/bookform.component';
import { BookformWrapComponent } from './bookform-wrap/bookform-wrap.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent, children: [
    { path: 'edit/:id', component: BookformWrapComponent },
    { path: 'new', component: BookformWrapComponent },
  ] },
  { path: 'visitors', component: VisitorsComponent},
  { path: 'cards', component: CardsComponent},
  { path: 'statistics', component: StatisticsComponent},
  { path: 'newbook', component: BookformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
