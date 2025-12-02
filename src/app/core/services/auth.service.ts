import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apiService: ApiService) {}

  login(body: any) {
    return this.apiService.post('/auth/admin/login', body);
  }

  refreshToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    return this.apiService.post('/auth/admin/refresh', { refresh_token });
  }

  logout(data: any) {
    return this.apiService.post('/auth/admin/logout', data);
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }
}
