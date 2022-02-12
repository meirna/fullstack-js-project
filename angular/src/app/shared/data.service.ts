import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event, Comment, Message, User } from './models';

const API = {
  LOGIN: `${environment.api}/api/users/login`,
  LOGOUT: `${environment.api}/api/users/logout`,
  REGISTER: `${environment.api}/api/users/register`,
  EVENTS: `${environment.api}/api/events`,
  MESSAGES: `${environment.api}/api/messages`,
};

export type MongoResponse = {
  insertedId: string;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post<User>(`${API.LOGIN}`, user, {
      observe: 'response',
      withCredentials: true,
    });
  }

  logout() {
    return this.http.post<User>(`${API.LOGOUT}`, null, {
      observe: 'response',
      withCredentials: true,
    });
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
    return this.http.post<MongoResponse>(`${API.EVENTS}`, event, {
      observe: 'response',
      withCredentials: true,
    });
  }

  putEvent(event: Event) {
    return this.http.put<MongoResponse>(`${API.EVENTS}`, event, {
      observe: 'response',
      withCredentials: true,
    });
  }

  deleteEvent(id: string) {
    return this.http.delete<Event>(`${API.EVENTS}/${id}`, {
      observe: 'response',
      withCredentials: true,
    });
  }

  postComment(comment: Comment) {
    return this.http.post<Comment>(
      `${API.EVENTS}/${comment.eventId}/comment`,
      comment,
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  }

  getMessages() {
    return this.http.get<Message[]>(`${API.MESSAGES}`, {
      withCredentials: true,
    });
  }

  getConversation(username: string) {
    return this.http.get<Message[]>(`${API.MESSAGES}/${username}`, {
      withCredentials: true,
    });
  }

  postMessage(message: Message) {
    return this.http.post<Message>(
      `${API.MESSAGES}/${message.recipient?.username}`,
      message,
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  }
}
