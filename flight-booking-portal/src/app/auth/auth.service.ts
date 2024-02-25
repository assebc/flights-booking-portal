import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser?: User;
  
  constructor() {}

  loginUser(user: User){
    this.currentUser = user;
  }

}
