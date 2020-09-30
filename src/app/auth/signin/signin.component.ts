import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css', '../auth.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;

  // Define property that will handle loading status
  isLoading: boolean;

  // Define properties to display error messages to the user
  error = null;
  message = '';

  // Error messages
  email: string = "Email address you entered is not valid";
  pwdRegex: string = "Your password must contain at least one digit, one lowercase and uppercase letter and one non-alphanumeric character";
  minlength: string = "Your password must be at least 8 characters long";
  required: string = "This field is required";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, 
                   Validators.pattern(/^[a-zA-Z0-9.-_]*@[a-z]*\.[a-z]{2,3}$/)]],
      pwd: ['', [Validators.required, 
                 Validators.minLength(8),
                 Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/)]]
    });
  }

  onSubmit() {
    // Store values from the form into existing user object
    this.authService.existingUser.Email = this.signInForm.get('email').value;
    this.authService.existingUser.Password = this.signInForm.get('pwd').value;

    this.isLoading = true;
    this.authService.signin().subscribe((res: any) => {
      this.isLoading = false;

      // Calculate the time after which the token expires and store it into a variable
      const expirationDuration = Date.parse(res.tokenExpirationTime) - Date.now();
      this.authService.expirationDuration = expirationDuration;

      // Set login status to true and username to the currenty logged in user's username
      this.authService.isLoggedIn.next(true);
      this.authService.username.next(res.username);

      // Set first login to true
      this.authService.isFirstLogin.next(true);

      // Store token, token expiration time and username in local storage
      localStorage.setItem("token", res.token);
      localStorage.setItem("tokenExpirationTime", res.tokenExpirationTime);
      localStorage.setItem("username", res.username);

      // Navigate to home page on success
      this.router.navigate(['/home']);
      this.signInForm.reset();
    }, err => {
      this.isLoading = false;
      this.error = true;
      if (err.status === 400) {
        this.message = err.error.message;
      } else {
        this.message = `Some error occured: ${err.message}`;
      }
      console.log(err);
    });
  };

  onHandleResponse() {
    this.error = null;
  };
}
