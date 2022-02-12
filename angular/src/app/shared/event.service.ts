import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { DataService } from './data.service';
import { Comment, Event } from './models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events?: Event[];
  eventsSubject: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  private event?: Event;
  eventSubject: BehaviorSubject<Event | undefined> = new BehaviorSubject<
    Event | undefined
  >(new Event());

  constructor(private service: DataService, private userService: UserService) {
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
    this.service
      .postEvent(event)
      .pipe(
        catchError((err) => {
          this.eventSubject.next(undefined);
          return of();
        })
      )
      .subscribe((res) => {
        event._id = res.body!.insertedId;
        this.event = { ...event, user: { ...this.userService.getUser() } };
        this.eventSubject.next({ ...this.event });
      });
  }

  updateEvent(event: Event) {
    this.service
      .putEvent(event)
      .pipe(
        catchError((err) => {
          this.eventSubject.next(undefined);
          return of();
        })
      )
      .subscribe((res) => {
        event._id = res.body?.insertedId;
        this.event = { ...event, user: { ...this.userService.getUser() } };
        this.eventSubject.next({ ...this.event });
      });
  }

  deleteEvent(id: string) {
    this.service
      .deleteEvent(id)
      .pipe(
        catchError((err) => {
          this.eventSubject.next(undefined);
          return of();
        })
      )
      .subscribe((res) => {
        this.event = new Event();
        this.eventSubject.next({ ...this.event, _id: id });
        const i = this.events?.findIndex((event) => event._id == id);
        this.events?.splice(i!, 1);
        this.eventsSubject.next([...this.events!]);
      });
  }

  createComment(comment: Comment) {
    this.service
      .postComment(comment)
      .pipe(
        catchError((err) => {
          this.eventSubject.next(undefined);
          return of();
        })
      )
      .subscribe((res) => {
        if (!this.event!.comments) {
          this.event!.comments = [];
        }
        this.event?.comments?.push(res.body!);
        this.eventSubject.next({ ...this.event });
      });
  }

  clear() {
    this.event = {};
    this.eventSubject.next({});
  }
}
