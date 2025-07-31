import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequestModel } from "../models/LoginRequestModel";
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginResponseModel } from '../models/LoginResponseModel';
import { environment } from '../../../../environments/environment.development';
import { UserModel } from '../models/UserModel';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  $user = new BehaviorSubject<UserModel | undefined>(undefined);
  
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }
  
  
  login(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
    
    return this.httpClient.post<LoginResponseModel>(`${environment.apiBaseUrl}/api/auth/login`, loginRequest)
    
  }

  setUser( user: UserModel) : void{
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));

  }

  user(): Observable<UserModel | undefined>{
    return this.$user.asObservable();
  }

  getUser() : UserModel | undefined{
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if(email && roles)
    {
      const user : UserModel = {
        email: email,
        roles: roles.split(',')
    }
      return user;
    }

    return undefined;
  }
  Logout(): void {
   localStorage.clear();
   this.cookieService.delete('Authorization', '/', undefined, true, 'Strict');
   this.$user.next(undefined);
  }
}
