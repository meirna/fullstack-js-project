import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { Message } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages?: Message[];
  messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(
    []
  );
  private conversation?: Message[];
  conversationSubject: BehaviorSubject<Message[]> = new BehaviorSubject<
    Message[]
  >([]);

  constructor(private service: DataService) {}

  getMessages() {
    this.service.getMessages().subscribe((res) => {
      this.messages = res;
      this.messagesSubject.next([...this.messages]);
    });
  }

  getConversation(username: string) {
    this.service.getConversation(username).subscribe((res) => {
      this.conversation = res;
      this.conversationSubject.next([...this.conversation]);
    });
  }

  postMessage(message: Message) {
    this.service.postMessage(message).subscribe((res) => {
      this.conversation?.push(message);
      this.conversationSubject.next([...this.conversation!]);
    });
  }

  clear() {
    this.messages = [];
    this.messagesSubject.next([...this.messages]);
    this.conversation = [];
    this.conversationSubject.next([...this.conversation]);
  }
}
