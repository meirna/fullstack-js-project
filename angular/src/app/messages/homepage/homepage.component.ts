import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Message } from 'src/app/shared/models';
import { MessageService } from '../../shared/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  environment: any;
  messages: Message[] = [];
  selectedUsername?: string | null;
  subscription?: Subscription;
  routerSubscription?: Subscription;
  routeSubscription?: Subscription;

  constructor(
    private service: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.routeSubscription = this.route.firstChild?.paramMap.subscribe(
          (paramMap) => {
            this.selectedUsername = paramMap.get('username');
          }
        );
      });
  }

  ngOnInit() {
    this.environment = environment;
    this.subscription = this.service.messagesSubject.subscribe(
      (res) => (this.messages = res)
    );
    this.service.getMessages();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}
