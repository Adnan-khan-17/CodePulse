import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Auth/services/auth.service';
import { UserModel } from '../../Auth/models/UserModel';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
// import { response } from 'express';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export default class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  user? :UserModel;

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      },
    });

    this.user = this.authService.getUser();
  }
  onLogout(): void {
    this.authService.Logout();
    this.router.navigateByUrl('');
  }
}
