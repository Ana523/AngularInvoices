import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../auth.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  
  // Properties for showing messages to the user if there is an error or success
  error = null;
  success = null;
  message = '';

  // Set timer property so that if there is a Timeout set, we can clear out the timer
  private timer: any;

  // Error messages
  usernameRegex: string = "Username must contain only lowercase and/or uppercase letters or numbers and no spaces are allowed";
  email: string = "Email address you entered is not valid";
  pwdRegex: string = "Your password must contain at least one digit, one lowercase and uppercase letter and one non-alphanumeric character";
  minlength: string = "Your password must be at least 8 characters long";
  required: string = "This field is required";
  passwordMismatch: string = "Passwords don't match";

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Initialize form and set validators
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, 
                      Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, 
                   Validators.pattern(/^[a-zA-Z0-9.-_]*@[a-z]*\.[a-z]{2,3}$/)]],
      passwords: this.fb.group({
        pwd: ['', [Validators.required, 
                   Validators.minLength(8), 
                   Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/)]],
        confirmPwd: ['', [Validators.required, 
                          Validators.minLength(8), 
                          Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/)]]
      }, { validator : this.comparePasswords })
    });
  }

  onSubmit() {
    // Store form values into user object
    this.authService.user.UserName = this.signUpForm.get('username').value;
    this.authService.user.FullName = this.signUpForm.get('fullName').value;
    this.authService.user.Email = this.signUpForm.get('email').value;
    this.authService.user.Password = this.signUpForm.get('passwords.pwd').value;

    this.authService.signup().subscribe((res: any) => {
      // Handle success and error cases
      if (res.succeeded) {
        this.success = true;
        this.message = "You have successfully signed up. Please sign in to start using the application.";
        this.timer = setTimeout(() => this.router.navigate(["../signin"], { relativeTo: this.route }), 5000);
        this.signUpForm.reset();
      } else {
        res.errors.forEach(element => {
          this.error = true;
          switch(element.code) {
            case "DuplicateUserName":
              this.message = `Username ${this.authService.user.UserName} is already taken.`;
            break;
            default:
              this.message = "There was some error with signing up. Please try again.";
          }
        });
      }
    }, err => {
      this.error = true;
      if (err.status === 400) {
        this.message = "Email already exists";
      } else {
        this.message = `Some error occured: ${err.message}`;
      }
      console.log(err);
    });
  };

  private comparePasswords(fb: FormGroup) {
    let pwdCtrl = fb.get('pwd');
    let confirmPwdCtrl = fb.get('confirmPwd');

    // Check if passwords don't have any errors
    if (confirmPwdCtrl.errors == null && pwdCtrl.errors == null) {
      
      // Compare passwords' values
      if (pwdCtrl.value != confirmPwdCtrl.value) {
        confirmPwdCtrl.setErrors({ passwordMismatch : true });
      } else {
        confirmPwdCtrl.setErrors(null);
      }
    }
  };

  onHandleResponse() {
    // Set error and success properties back to null and clear Timeout in success case
    if (this.error) {
      this.error = null;
    } else if (this.success) {
      this.success = null;
      this.router.navigate(["../signin"], { relativeTo: this.route });
      clearTimeout(this.timer);
    }
  }
}
