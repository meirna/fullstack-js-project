import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService, MongoResponse } from '../data.service';
import { Event } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events?: Event[];
  eventsSubject: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  private event?: Event;
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

  createEvent(event: Event) {
    this.service.postEvent(event).subscribe((res) => {
      event._id = res.insertedId;
      this.event = event;
      this.eventSubject.next({ ...this.event });
    });
  }

  updateEvent(event: Event) {
    this.service.putEvent(event).subscribe((res) => {
      event._id = res.insertedId;
      this.event = event;
      this.eventSubject.next({ ...this.event });
    });
  }

  deleteEvent(id: string) {
    this.service.deleteEvent(id).subscribe((res) => {
      this.event = new Event();
      this.eventSubject.next({ ...this.event });
      const i = this.events?.findIndex((event) => event._id == id);
      this.events?.splice(i!, 1);
      this.eventsSubject.next([...this.events!]);
    });
  }
}
