import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EventsRoutingModule } from './events-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { DefaultImagePipe } from './default-image.pipe';
import { EventFormComponent } from './event-form/event-form.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HomepageComponent,
    EventCardComponent,
    EventDetailComponent,
    DefaultImagePipe,
    EventFormComponent,
  ],
  imports: [CommonModule, EventsRoutingModule, ReactiveFormsModule],
})
export class EventsModule {}
