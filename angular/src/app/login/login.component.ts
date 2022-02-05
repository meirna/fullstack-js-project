import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  subscription?: Subscription;
  rememberMe = false;
  submitted = false;
  error = false;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  form = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.maxLength(255)]],
    remember: [this.rememberMe],
  });

  ngOnInit() {
    this.subscription = this.service.behaviorSubject.subscribe((res) => {
      if (res) {
        this.error = false;
        if (this.submitted) this.router.navigate(['/']);
      } else if (this.submitted) {
        this.error = true;
      }
    });
  }

  handleRememberClicked() {
    this.rememberMe = !this.rememberMe;
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      this.service.login(
        new User(this.form.value.username, this.form.value.password),
        this.rememberMe
      );
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
