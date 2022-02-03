import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event, Comment, Message, User } from './models';

const API = {
  LOGIN: 'http://localhost:8080/api/login',
  REGISTER: 'http://localhost:8080/api/register',
  EVENTS: 'http://localhost:8080/api/events',
  MESSAGES: 'http://localhost:8080/api/messages',
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post<User>(`${API.LOGIN}`, user);
  }

  register(user: User) {
    return this.http.post<User>(`${API.REGISTER}`, user);
  }

  getEvents() {
    return this.http.get<Event[]>(`${API.EVENTS}`);
  }

  getEvent(id: string) {
    return this.http.get<Event>(`${API.EVENTS}/${id}`);
  }

  postEvent(event: Event) {
    return this.http.post<Event>(`${API.EVENTS}`, event);
  }

  putEvent(event: Event) {
    return this.http.put<Event>(`${API.EVENTS}`, event);
  }

  deleteEvent(event: Event) {
    return this.http.delete<Event>(`${API.EVENTS}/${event._id}`);
  }

  postComment(event: Event, comment: Comment) {
    return this.http.post<Comment>(
      `${API.EVENTS}/${event._id}/comment`,
      comment
    );
  }

  getMessages() {
    return this.http.get<Message[]>(`${API.MESSAGES}`);
  }

  postMessage(message: Message) {
    return this.http.post<Message>(`${API.MESSAGES}`, message);
  }
}
