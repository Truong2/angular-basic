import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private apiService: ApiService) {}

  getAdminProfile<Response = unknown>(
    params?: Record<string, string | number | boolean>
  ): Observable<Response> {
    return this.apiService.get<Response>('/admin/profile', params);
  }
}
