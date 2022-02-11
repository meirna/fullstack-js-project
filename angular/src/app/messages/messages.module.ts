import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ConversationComponent } from './conversation/conversation.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomepageComponent, ConversationComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class MessagesModule {}
