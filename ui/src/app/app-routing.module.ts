import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [
  // {path: '**', component: BookListComponent},
  {path: 'books', component: BookListComponent},
  {path: 'book/add', component: AddBookComponent},
  {path: 'book/:id', component: BookDetailComponent},
  { path: '**', redirectTo: 'books', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
