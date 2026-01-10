import { Book } from './book';

export class User {
  id: string = '';
  login: string;
  password: string;
  books: Book[] = [];
  goal: number = 0;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }

  addBook(
    title: string,
    author?: string,
    genre?: string,
    published?: Date,
    score?: number,
    description?: string,
    readOn?: Date
  ) {
    let newBook = new Book(title);
    if (author !== undefined) {
      newBook.author = author;
    }
    if (genre !== undefined) {
      newBook.genre = genre;
    }
    if (published !== undefined) {
      newBook.published = published;
    }
    if (score !== undefined) {
      newBook.score = score;
    }
    if (description !== undefined) {
      newBook.description = description;
    }
    if (readOn !== undefined) {
      newBook.readOn = readOn;
    }

    this.books.push(newBook);
  }
}
