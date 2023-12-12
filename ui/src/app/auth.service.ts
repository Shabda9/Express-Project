import { Injectable } from '@angular/core';
import { User } from './interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser!: User;
  constructor() { }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
