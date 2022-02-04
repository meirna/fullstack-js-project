import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  submitted = false;
  error = false;

  constructor(private fb: FormBuilder, private service: UserService) {}

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', Validators.required],
    email: [
      '',
      [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')],
    ],
  });

  ngOnInit() {
    this.subscription = this.service.behaviorSubject.subscribe((res) => {
      if (res) {
        this.error = false;
      } else if (this.submitted) {
        this.error = true;
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      this.service.register(
        new User(this.form.value.username, this.form.value.password)
      );
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
