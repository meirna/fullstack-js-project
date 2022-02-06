import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message, User } from 'src/app/models';
import { UserService } from 'src/app/user.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit, OnDestroy {
  conversation: Message[] = [];
  user?: User;
  subscription?: Subscription;

  constructor(
    private service: MessageService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subscription = this.service.conversationSubject.subscribe(
      (res) => (this.conversation = res)
    );
    this.service.getConversation(this.route.snapshot.paramMap.get('username')!);
    this.user = this.userService.getUser();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
