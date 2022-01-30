import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event, Comment, Message, User } from './models';

const API = {
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  EVENTS: '/api/events',
  COMMENTS: '/api/comments',
  MESSAGES: '/api/messages',
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

  getEvent(event: Event) {
    return this.http.get<Event>(`${API.EVENTS}/${event._id}`);
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

  postComment(comment: Comment) {
    return this.http.post<Comment>(`${API.COMMENTS}`, comment);
  }

  getMessages() {
    return this.http.get<Message[]>(`${API.MESSAGES}`);
  }

  postMessage(message: Message) {
    return this.http.post<Message>(`${API.MESSAGES}`, message);
  }
}
