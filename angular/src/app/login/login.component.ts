import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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
