import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "http://localhost:65176/api/ApplicationUser";
  
  // Define two behavior subjects so that navigation bar can be updated accordingly
  isLoggedIn = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('isLoggedIn') || 'false'));
  username = new BehaviorSubject<string>(localStorage.getItem('username'));

  // Define behavior subject which emits info about first login
  isFirstLogin = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('isFirstLogin')));

  // Set property so that the timer can be cleared
  public tokenExpirationTimer: any;

  // Define user and existing user objects
  user = {
    UserName: '',
    FullName: '',
    Email: '',
    Password: ''
  };

  existingUser = {
    Email: '',
    Password: ''
  };

  // Properties in which the number of miliseconds till the token expires is stored
  expirationDuration: number;
  autologinExpirationDuration: number;
  
  constructor(private http: HttpClient, private router: Router) { }

  signup() {
    return this.http.post(`${this.baseUrl}/Signup`, this.user);
  }

  signin() {
    return this.http.post(`${this.baseUrl}/Signin`, this.existingUser);
  }

  autologin() {
    // Get data from the local storage
    const token = localStorage.getItem('token');
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
    const username = localStorage.getItem('username');

    if (!token && !tokenExpirationTime && !username) {
      return;
    } else if (token && Date.parse(tokenExpirationTime) > Date.now()) {
      // Set login status to true and username to username key's value stored in local storage
      this.isLoggedIn.next(true);
      this.username.next(username);

      // Set first login to false
      this.isFirstLogin.next(false);

      // Store the remaining token expiration time into a variable
      this.autologinExpirationDuration = Date.parse(tokenExpirationTime) - Date.now();
    };
  }
  
  logout() {
    // Set login status to false and username to an empty string
    this.isLoggedIn.next(false);
    this.username.next('');

    // Remove token, token expiration time and username from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpirationTime");
    localStorage.removeItem("username");

    // Navigate user to signin page
    this.router.navigate(['/auth/signin']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }
}
