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
    name: [''],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {}

  onSubmit() {}
}
