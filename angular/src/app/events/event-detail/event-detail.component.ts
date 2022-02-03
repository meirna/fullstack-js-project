import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EventService } from '../event.service';
import { Event } from 'src/app/models';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  event?: Event;
  eventSubject?: BehaviorSubject<Event>;
  eventSubscription?: Subscription;

  constructor(private service: EventService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventSubject = this.service.getEvent(
      this.route.snapshot.paramMap.get('id')!
    );
    this.eventSubscription = this.eventSubject.subscribe(
      (res) => (this.event = res)
    );
  }
}
