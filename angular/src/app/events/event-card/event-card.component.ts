import { Component, Input } from '@angular/core';
import { Event } from 'src/app/shared/models';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent {
  @Input() event?: Event;
}
