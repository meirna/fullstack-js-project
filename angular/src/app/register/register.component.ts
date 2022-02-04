import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  rememberMe = false;

  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', Validators.required],
    passwordRepeat: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    remember: [this.rememberMe],
  });

  ngOnInit(): void {}

  handleRememberClicked() {
    this.rememberMe = !this.rememberMe;
  }

  onSubmit() {}
}
