import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from './data.service';
import { User } from './models';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user?: User;
  behaviorSubject: BehaviorSubject<User | boolean> = new BehaviorSubject<
    User | boolean
  >(false);

  constructor(
    private service: DataService,
    private cookieService: CookieService
  ) {
    this.behaviorSubject.next(this.cookieService.get('loggedIn') === 'true');
  }

  getUser() {
    return { ...this.user };
  }

  register(user: User) {
    this.service
      .register(user)
      .pipe(
        catchError((err) => {
          this.behaviorSubject.next(false);
          return of();
        })
      )
      .subscribe((res: User) => {
        this.behaviorSubject.next(true);
      });
  }

  login(user: User, remember: boolean) {
    this.service
      .login(user)
      .pipe(
        catchError((err) => {
          this.behaviorSubject.next(false);
          return of();
        })
      )
      .subscribe((res: HttpResponse<User>) => {
        this.user = new User(res.body!.username);
        this.behaviorSubject.next({ ...this.user });
        if (remember) this.cookieService.set('loggedIn', 'true');
      });
  }

  logout() {
    this.service
      .logout()
      .pipe(
        catchError((err) => {
          this.behaviorSubject.next(false);
          return of();
        })
      )
      .subscribe((res) => {
        this.user = undefined;
        this.behaviorSubject.next(false);
        this.cookieService.delete('loggedIn');
      });
  }
}