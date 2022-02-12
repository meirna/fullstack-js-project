import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from './data.service';
import { User } from './models';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService implements CanLoad, CanActivate {
  private user?: User;
  behaviorSubject: BehaviorSubject<User | boolean> = new BehaviorSubject<
    User | boolean
  >(false);

  constructor(
    private service: DataService,
    private cookieService: CookieService,
    private router: Router
  ) {
    if (!this.user?.username) {
      this.getUser();
    }
    this.behaviorSubject.next(this.user?.username ? { ...this.user } : false);
  }

  getUser() {
    this.user = new User(this.cookieService.get('user'));
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
        this.cookieService.set('user', this.user.username!, {
          expires: remember ? 7 : undefined,
        });
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
        this.cookieService.delete('user');
        this.user = undefined;
        this.behaviorSubject.next(false);
        this.router.navigateByUrl('');
        window.location.reload();
      });
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.authorize();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authorize();
  }

  private authorize() {
    if (this.user?.username) return true;
    this.router.navigateByUrl('');
    return false;
  }
}
