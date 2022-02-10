import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { UserLinkComponent } from './user-link/user-link.component';

@NgModule({
  declarations: [NavbarComponent, UserLinkComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, UserLinkComponent],
})
export class SharedModule {}
