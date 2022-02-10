import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.css'],
})
export class UserLinkComponent implements OnInit {
  @Input() user?: User;

  constructor(private router: Router) {}

  ngOnInit() {}

  onUsernameClick(event: any) {
    if (this.user?.username)
      this.router.navigate([`/messages`], {
        queryParams: { username: event?.target?.innerHTML.trim() },
      });
  }
}
