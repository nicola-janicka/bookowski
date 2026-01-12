import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { User } from './user';
import { doc } from 'firebase/firestore';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Secret {
  id?: number;
  name: string;
  value: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/secrets';
  firebaseConfig = {
    apiKey: '',
    authDomain: 'bookowski-81855.firebaseapp.com',
    projectId: 'bookowski-81855',
    storageBucket: 'bookowski-81855.firebasestorage.app',
    messagingSenderId: '370007343925',
    appId: '1:370007343925:web:7995797fd210aa7dff427c',
  };
  constructor(private http: HttpClient) {
    let apiKey = '';
    http.get<Secret>(`${this.apiUrl}/0`).subscribe((data) => {
      apiKey = data.value;
    });
    this.firebaseConfig.apiKey = apiKey;
  }

  app = initializeApp(this.firebaseConfig);
  db = getFirestore(this.app);
  async getUsers(): Promise<User[]> {
    let usersList: User[] = [];
    const usersSnapshot = await getDocs(collection(this.db, 'users'));
    usersSnapshot.forEach((doc) => {
      let data = doc.data();
      let user = new User(data['login'], data['password']);
      user.id = doc.id;
      let books: Book[] = data['books'];
      user.books = books;

      usersList.push(user);
    });

    return usersList;
  }

  async getUser(login: string, password: string): Promise<User> {
    const q = query(
      collection(this.db, 'users'),
      where('login', '==', login),
      where('password', '==', password)
    );
    let userSnapshot = await getDocs(q);
    if (userSnapshot.docs.length === 1) {
      let data = userSnapshot.docs[0].data();
      let user = new User(data['login'], data['password']);
      user.id = userSnapshot.docs[0].id;
      let books: Book[] = data['books'];
      user.books = books;
      return user;
    }
    return new User('', '');
  }

  async addUser(login: string, password: string): Promise<string> {
    const docRef = await addDoc(collection(this.db, 'users'), {
      login: login,
      password: password,
    });
    return docRef.id;
  }

  async deleteUser(id: string) {
    await deleteDoc(doc(this.db, `users/${id}`));
  }

  async updateUser(user: User) {
    let booksList: Object[] = [];
    user.books.forEach((book) => {
      let tempBook = {
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        score: book.score,
        description: book.description,
        readStart: book.readStart ? Timestamp.fromDate(book.readStart) : null,
        readOn: book.readOn ? Timestamp.fromDate(book.readOn) : null,
        read: book.read,
      };
      booksList.push(tempBook);
    });
    await updateDoc(doc(this.db, `users/${user.id}`), {
      login: user.login,
      password: user.password,
      books: booksList,
      goal: user.goal,
    });
  }
}
