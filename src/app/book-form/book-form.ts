import { ReadStatus, Book } from './../../book';
import { title } from 'process';
import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { Validators, FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-book-form',
  imports: [
    ReactiveFormsModule,
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm {
  // @Output() close = new EventEmitter<void>();
  @Output() newItemEvent = new EventEmitter<Book>();

  newBookForm!: FormGroup;
  // newBookForm!: FormGroup,
  //   title: ['', Validators.required],
  //   author: ['', Validators.required],
  // });

  user: User = new User('', '');
  bookForm: Book = new Book('');
  message: string = '';
  constructor(
    private fb: FormBuilder,
    private us: UserService,
    private dialogRef: MatDialogRef<BookForm>,
    @Inject(MAT_DIALOG_DATA) public data: { book?: Book }
  ) {}

  ngOnInit() {
    if (this.data.book != undefined) {
      this.newBookForm = this.fb.group({
        title: [this.data.book.title, Validators.required],
        author: [this.data.book.author, Validators.required],
        genre: [this.data.book.genre],
        published: [this.data.book.published],
        score: [this.data.book.score],
        description: [this.data.book.description],
        readOn: [this.data.book.readOn],
        read: [this.data.book.read],
      });
    } else {
      this.newBookForm = this.fb.group({
        title: ['', Validators.required],
        author: ['', Validators.required],
        genre: [''],
        published: [''],
        score: [''],
        description: [''],
        readOn: [''],
        read: [''],
      });
    }
  }
  // addNewItem() {
  //   this.newItemEvent.emit(this.bookForm);
  // }

  submitForm() {
    console.log('TUTAJ!!!!!!!', this.newBookForm.value);
    this.dialogRef.close(this.newBookForm.value);
  }

  closeForm() {
    this.dialogRef.close();
  }

  // closePopup() {
  //   this.close.emit();
  // }
}
