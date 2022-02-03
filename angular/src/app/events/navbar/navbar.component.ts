import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isProfileOpen = false;

  constructor() {}

  ngOnInit(): void {}

  handleProfileClick() {
    this.isProfileOpen = !this.isProfileOpen;
  }
}
