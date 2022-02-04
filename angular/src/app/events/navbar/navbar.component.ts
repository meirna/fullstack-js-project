import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  isLoggedIn = false;
  isProfileOpen = false;

  constructor(private service: UserService) {}

  ngOnInit() {
    this.subscription = this.service.behaviorSubject.subscribe((res) => {
      if (res) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  handleProfileClick() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  handleLogout() {
    this.service.logout();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
