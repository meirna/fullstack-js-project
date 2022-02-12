import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Message, User } from 'src/app/models';
import { UserService } from 'src/app/user.service';
import { MessageService } from '../message.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';

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
  error = false;
  submitted = false;

  constructor(
    private service: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(8000)]],
  });

  ngOnInit() {
    this.environment = environment;
    this.subscription = this.service.conversationSubject.subscribe((res) => {
      if (res) this.conversation = res;
      else if (this.submitted) this.error = true;
    });
    this.user = this.userService.getUser();
    this.routeSubscription = this.route.firstChild?.paramMap.subscribe(
      (paramMap) => {
        const username = paramMap.get('username');
        if (username) {
          this.recipient = new User(username);
          this.service.getConversation(username);
        }
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      this.service.postMessage(
        new Message(this.user, this.recipient, this.form.value.text)
      );
      this.form.reset({ text: '' });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}
