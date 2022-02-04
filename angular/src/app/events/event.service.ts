import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { Event } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events?: Event[];
  private eventsSubject: BehaviorSubject<Event[]> = new BehaviorSubject<
    Event[]
  >([]);
  private event?: Event;
  private eventSubject: BehaviorSubject<Event> = new BehaviorSubject<Event>(
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
