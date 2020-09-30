import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'invoice';

  // Get access to an element holding a Placeholder directive
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService, private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.authService.autologin();

    this.authService.isFirstLogin.subscribe(firstLogin => {
      if (firstLogin == true) {
        // Display alert cmp after signin button has been clicked, autologin method has not been called and the token has expired
        this.countdown(this.authService.expirationDuration);
      } else if (firstLogin == false) {
        // Display alert cmp after autologin method has been called at least once and the token has expired
        this.countdown(this.authService.autologinExpirationDuration);
      }
    })
  }

  private alertTokenExpiration() {
      const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
      const hostViewContainerRef = this.alertHost.viewContainerRef;

      // Clear everything that was in the view container
      hostViewContainerRef.clear();

      // Create alert component's instance
      const alertCmp = hostViewContainerRef.createComponent(alertCmpFactory);

      // Set alert component's message and subscribe to close event emitter
      alertCmp.instance.message = 'Your token has expired. Please sign in again.';
      alertCmp.instance.close.subscribe(() => {
      this.authService.logout();

      // Clear everything in the view container
      hostViewContainerRef.clear();
    });
  }

  private countdown(expirationDuration: number) {
    this.authService.tokenExpirationTimer = setTimeout(() => {
      this.alertTokenExpiration();
    }, expirationDuration)
  }
}
