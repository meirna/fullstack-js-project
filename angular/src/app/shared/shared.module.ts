import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { UserLinkComponent } from './user-link/user-link.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, UserLinkComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, UserLinkComponent],
})
export class SharedModule {}
