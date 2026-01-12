import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { Book, ReadStatus } from '../../book';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookForm } from '../book-form/book-form';
import { title } from 'process';
import { SimpleChanges } from '@angular/core';

//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
//Add 'implements OnInit' to the class.

@Component({
  selector: 'app-user-page',
  imports: [FormsModule, BookForm],
  templateUrl: './user-page.html',
  styleUrl: './user-page.css',
})
export class UserPage implements OnInit {
  formIsOpen: boolean = false;
  user: User = new User('', '');
  bookForm = {
    author: '',
    title: '',
  };

  constructor(
    private us: UserService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log('Hello!');
    this.us.getUser('admin', 'blabla').then((userSnaphot) => {
      this.user = userSnaphot;
      this.cdr.detectChanges();
      console.log(this.user);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}
  openBookForm() {
    const dialogRef = this.dialog.open(BookForm, {
      width: '600px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((formData) => {
      console.log(formData);
      if (formData) {
        this.user.addBook(formData.title, formData.author);
        this.us.updateUser(this.user);

        this.cdr.detectChanges();
      }
    });
  }

  addBook(book: Book) {
    this.user.addBook(book.title, book.author);
    this.us.updateUser(this.user);
    this.formIsOpen = false;
  }

  deleteBook(index: number) {
    this.user.books.splice(index, 1);
    console.log(this.user.books);
    this.us.updateUser(this.user);
  }

  editBook(index: number) {
    const dialogRef = this.dialog.open(BookForm, {
      width: '600px',
      data: { book: this.user.books[index] },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      console.log(formData);
      if (formData) {
        let book = this.user.books[index];
        book.title = formData.title;
        book.author = formData.author;
        book.genre = formData.genre;
        book.score = formData.score;
        book.description = formData.description;
        book.readStart = formData.readStart;
        book.readOn = formData.readOn;
        book.read = formData.read;

        this.us.updateUser(this.user);
        this.cdr.detectChanges();
      }
    });
  }

  showBookForm() {
    this.formIsOpen = true;
  }
}
