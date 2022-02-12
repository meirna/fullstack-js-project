import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event, User } from 'src/app/shared/models';
import { UserService } from 'src/app/shared/user.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user?: User;
  subscription?: Subscription;
  isProfileOpen = false;
  isMenuOpen = false;

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.userService.behaviorSubject.subscribe((res) => {
      this.user = res;
    });
  }

  onMessagesClick() {
    this.router.navigate(['/messages']);
  }

  onProfileClick() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  onMenuBarsClick() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout() {
    this.userService.logout();
    this.eventService.clear();
  }

  onButtonClick() {
    if (this.user?.username) {
      this.eventService.eventSubject?.next(new Event());
      this.router.navigate(['/events/new']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
