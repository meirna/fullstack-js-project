import { Component, Input } from '@angular/core';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.css'],
})
export class UserLinkComponent {
  @Input() user?: User;
}
