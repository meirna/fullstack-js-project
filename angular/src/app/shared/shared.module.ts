import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { UserLinkComponent } from './user-link/user-link.component';
import { RouterModule } from '@angular/router';
import { AlertErrorComponent } from './alert-error/alert-error.component';

@NgModule({
  declarations: [NavbarComponent, UserLinkComponent, AlertErrorComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, UserLinkComponent, AlertErrorComponent],
})
export class SharedModule {}
