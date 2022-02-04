import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {
  @Input() event?: Event;

  constructor() {}

  ngOnInit(): void {}
}
