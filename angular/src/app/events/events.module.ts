import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { DefaultImagePipe } from './default-image.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    HomepageComponent,
    EventCardComponent,
    EventDetailComponent,
    DefaultImagePipe,
  ],
  imports: [CommonModule, EventsRoutingModule],
})
export class EventsModule {}
