import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  email: string;
  givenName: string;
  nickname: string;
  password: string;

  constructor(private authService: AuthService) {}

  onRegister(): void {
    this.authService.register(
      this.email,
      this.givenName,
      this.nickname,
      this.password
    );
  }
}
