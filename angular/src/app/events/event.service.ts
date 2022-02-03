import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { Event } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  events?: Event[];
  eventsSubject: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  event?: Event;
  eventSubject: BehaviorSubject<Event> = new BehaviorSubject<Event>(
    new Event()
  );

  constructor(private service: DataService) {
    this.service.getEvents().subscribe((res) => {
      this.events = res;
      this.eventsSubject.next([...this.events]);
    });
  }

  getEvents(): BehaviorSubject<Event[]> {
    return this.eventsSubject;
  }

  getEvent(id: string) {
    this.service.getEvent(id).subscribe((res) => {
      this.event = res;
      this.eventSubject.next({ ...this.event });
    });

    return this.eventSubject;
  }
}
