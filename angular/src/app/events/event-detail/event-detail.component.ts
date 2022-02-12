import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EventService } from '../../shared/event.service';
import { Event, User } from 'src/app/shared/models';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  event?: Event;
  user?: User;
  eventSubject?: BehaviorSubject<Event | undefined>;
  eventSubscription?: Subscription;
  userSubscription?: Subscription;
  error = false;

  constructor(
    private service: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.eventSubject = this.service.getEvent(
      this.route.snapshot.paramMap.get('id')!
    );
    this.eventSubscription = this.eventSubject.subscribe((res) => {
      if (res) this.event = res;
      else this.error = true;
    });
    this.userSubscription = this.userService.behaviorSubject.subscribe(
      (res) => (this.user = res)
    );
  }

  onEditClick() {
    this.eventSubject?.next(this.event!);
    this.router.navigate([`/events/${this.event?._id}/edit`]);
  }

  onUsernameClick(event: any) {
    if (this.user?.username)
      this.router.navigate([`/messages`], {
        queryParams: { username: event?.target?.innerHTML.trim() },
      });
  }

  ngOnDestroy() {
    this.eventSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
}
