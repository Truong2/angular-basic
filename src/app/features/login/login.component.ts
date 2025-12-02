import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Login</h2>
    <input [(ngModel)]="email" placeholder="Email" />
    <input [(ngModel)]="password" type="password" placeholder="Password" />
    <button (click)="handleLogin()">Login</button>
  `,
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService) {}

  handleLogin() {
    this.auth.login({ email: this.email, password: this.password }).subscribe((res: any) => {
      localStorage.setItem('access_token', res.data.accessToken);
      localStorage.setItem('refresh_token', res.data.refreshToken);
      window.location.href = '/dashboard';
    });
  }
}
