import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ConversationComponent } from './conversation/conversation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomepageComponent, ConversationComponent],
  imports: [CommonModule, MessagesRoutingModule, SharedModule],
})
export class MessagesModule {}
