import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: object = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    const firstName = form.value.email;
    const lastName = form.value.email;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.register(firstName, lastName, email, password);
  }

}
