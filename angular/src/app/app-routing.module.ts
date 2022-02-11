import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsModule } from './events/events.module';
import { LoginComponent } from './login/login.component';
import { MessagesModule } from './messages/messages.module';
import { RegisterComponent } from './register/register.component';
import { UserService as AuthGuard } from './user.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'messages',
    loadChildren: () => MessagesModule,
    canLoad: [AuthGuard],
  },
  { path: '', loadChildren: () => EventsModule },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
