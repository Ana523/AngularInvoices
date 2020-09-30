import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isCollapsed: boolean = true;

  // Define two properties to store values emited by behaviour subjects
  $isLoggedIn: Observable<boolean>;
  $username: Observable<string>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.$isLoggedIn = this.authService.isLoggedIn;
    this.$username = this.authService.username;
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogout() {
    this.authService.logout();
  }
}
