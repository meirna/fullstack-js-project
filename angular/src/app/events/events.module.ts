import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EventsRoutingModule } from './events-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { DefaultImagePipe } from './default-image.pipe';
import { EventFormComponent } from './event-form/event-form.component';
import { CommentComponent } from './comment/comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomepageComponent,
    EventCardComponent,
    EventDetailComponent,
    DefaultImagePipe,
    EventFormComponent,
    CommentComponent,
    CommentFormComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class EventsModule {}
