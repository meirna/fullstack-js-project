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
  isProfileOpen = false;
  isMenuOpen = false;
  subscription?: Subscription;

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.userService.behaviorSubject.subscribe((res) => {
      this.user = this.userService.getUser();
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
