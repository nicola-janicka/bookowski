import { Routes } from '@angular/router';
import { BookCard } from './book-card/book-card';
import { UserPage } from './user-page/user-page';

export const routes: Routes = [
  {
    path: '',
    component: UserPage,
  },
  {
    path: 'book-card/:index',
    component: BookCard,
  },
];
