import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css', '../contacts.component.css']
})
export class EditContactComponent implements OnInit {
  contactForm: FormGroup;

  // Error messages
  required = 'This field is required';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.InitializeForm();
  }

  onSubmit() {
    console.log(this.contactForm);
  }

  private InitializeForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      id: ['', [Validators.required]],
      contact: ['', [Validators.required]]
    });
  }
}
