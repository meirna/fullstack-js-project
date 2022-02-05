import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Event } from 'src/app/models';
import { EventService } from '../event.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  eventsSubject?: BehaviorSubject<Event[]>;
  eventsSubscription?: Subscription;

  constructor(private service: EventService) {}

  ngOnInit() {
    this.eventsSubject = this.service.getEvents();
    this.eventsSubscription = this.eventsSubject.subscribe(
      (res) => (this.events = res)
    );
  }

  scrollToEvents() {
    document.querySelector('#events')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  ngOnDestroy() {
    this.eventsSubscription?.unsubscribe();
  }
}
