import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event, User } from 'src/app/models';
import { UserService } from 'src/app/user.service';
import { EventService } from '../../events/event.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user?: User;
  isLoggedIn = false;
  isProfileOpen = false;
  isMenuOpen = false;
  subscription?: Subscription;

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.userService.behaviorSubject.subscribe((res) => {
      if (res) {
        this.user = this.userService.getUser();
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
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
    this.router.navigate(['/']);
  }

  onButtonClick() {
    if (this.isLoggedIn) {
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
