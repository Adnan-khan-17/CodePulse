import { Component } from '@angular/core';
import { LoginRequestModel } from '../models/LoginRequestModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: LoginRequestModel;

  constructor( 
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router)
    {
    this.model = {
      email: '',
      password: ''  
    };
    }

    onSubmit( ): void {
      
      this.authService.login(this.model)
      .subscribe({
        next : (response) =>{
          // set Auth cookie
          this.cookieService.set('Authorization', `Bearer ${response.token}`,
            undefined, '/', undefined, true, 'Strict');   

            //set user in local storage
            this.authService.setUser({
              email: response.email,
              roles: response.roles
            })

            // redirect to home page
            this.router.navigateByUrl('');

        }
    });
  }
}
