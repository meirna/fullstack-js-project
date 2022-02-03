import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsModule } from './events/events.module';

const routes: Routes = [{ path: '', loadChildren: () => EventsModule }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
