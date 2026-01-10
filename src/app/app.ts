import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../user.service';
import { DocumentData } from 'firebase/firestore';
import { OnInit } from '@angular/core';
import { User } from '../user';
import { UserPage } from './user-page/user-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserPage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'bookowski';
  user: User = new User('', '');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser('admin', 'blabla').then((user) => {
      this.user = user;
      console.log(this.user);
    });
  }
}
