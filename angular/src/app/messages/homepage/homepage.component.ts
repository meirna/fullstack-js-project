import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Message, User } from 'src/app/models';
import { UserService } from 'src/app/user.service';
import { MessageService } from '../message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnDestroy {
  environment: any;
  messages: Message[] = [];
  subscription?: Subscription;

  constructor(private service: MessageService, private router: Router) {
    this.environment = environment;
    this.subscription = this.service.messagesSubject.subscribe(
      (res) => (this.messages = res)
    );
  }

  ngOnInit() {
    this.service.getMessages();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
