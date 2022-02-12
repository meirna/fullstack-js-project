import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService as AuthGuard } from '../shared/user.service';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventFormComponent } from './event-form/event-form.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: 'events/new',
    component: EventFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'events/:id/edit',
    component: EventFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'events/:id', component: EventDetailComponent },
  { path: '', component: HomepageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
