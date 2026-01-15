import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookForm } from '../book-form/book-form';

@Component({
  selector: 'app-book-card',
  imports: [RouterOutlet, BookForm],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {}
