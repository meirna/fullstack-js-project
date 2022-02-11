import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Message, User } from 'src/app/models';
import { UserService } from 'src/app/user.service';
import { MessageService } from '../message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit, OnDestroy {
  environment: any;
  conversation: Message[] = [];
  user?: User;
  recipient?: User;
  subscription?: Subscription;
  routerSubscription?: Subscription;
  routeSubscription?: Subscription;

  constructor(
    private service: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.environment = environment;

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.routeSubscription = this.route.firstChild?.paramMap.subscribe(
          (paramMap) => {
            const username = paramMap.get('username');
            if (username) {
              this.recipient = new User(username);
              this.service.getConversation(username);
            }
          }
        );
      });
  }

  ngOnInit() {
    this.subscription = this.service.conversationSubject.subscribe(
      (res) => (this.conversation = res)
    );
    this.user = this.userService.getUser();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}
