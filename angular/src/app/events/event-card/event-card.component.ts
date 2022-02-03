import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {
  @Input() event?: Event;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleClick() {
    this.router.navigate([`/events/${this.event!._id}`]);
  }
}
