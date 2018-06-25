import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: String = '';
  data: any;
  message = '';
  constructor(private http: HttpClient, private router: Router) { }

  signinUser(email: string, password: string) {
    const loginData = { email: email, password: password };
    this.http.post('http://localhost:8080/auth/login', loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      this.router.navigate(['home']);
    });
  }

  register(firstName: string, lastName: string, email: string, password: string) {
    const registerData = {firstName: firstName, lastName: lastName, email: email, password: password };
    this.http.post('http://localhost:8080/auth/register', registerData).subscribe(resp => {
      this.data = resp;
      this.router.navigate(['login']);
    }, err => {
      this.message = err.error.msg;
    });
  }
}
