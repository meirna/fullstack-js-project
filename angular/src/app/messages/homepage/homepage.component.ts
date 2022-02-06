import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Message } from 'src/app/models';
import { UserService } from 'src/app/user.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription?: Subscription;

  constructor(private service: MessageService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.service.messagesSubject.subscribe(
      (res) => (this.messages = res)
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
