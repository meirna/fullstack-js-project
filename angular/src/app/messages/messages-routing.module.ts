import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationComponent } from './conversation/conversation.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: ':username', component: ConversationComponent },
  { path: '', component: HomepageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
