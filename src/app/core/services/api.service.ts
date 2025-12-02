import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  private getFullUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${environment.apiUrl}${url.startsWith('/') ? url : '/' + url}`;
  }

  get<Response = unknown>(
    url: string,
    params?: Record<string, string | number | boolean>
  ): Observable<Response> {
    const fullUrl = this.getFullUrl(url);
    return this.http.get<Response>(fullUrl, { params: params });
  }

  post<Response = unknown>(url: string, body?: unknown): Observable<Response> {
    const fullUrl = this.getFullUrl(url);
    return this.http.post<Response>(fullUrl, body);
  }

  postMultiplePart(url: string, body: FormData) {
    const fullUrl = this.getFullUrl(url);
    return this.http.post(fullUrl, body);
  }

  put<Response = unknown>(url: string, body?: unknown): Observable<Response> {
    const fullUrl = this.getFullUrl(url);
    return this.http.put<Response>(fullUrl, body);
  }

  patch<Response = unknown>(url: string, body?: unknown): Observable<Response> {
    const fullUrl = this.getFullUrl(url);
    return this.http.patch<Response>(fullUrl, body);
  }

  patchMultipart(url: string, body: FormData) {
    const fullUrl = this.getFullUrl(url);
    return this.http.patch(fullUrl, body);
  }

  delete<Response = unknown>(
    url: string,
    params?: Record<string, string | number | boolean>
  ): Observable<Response> {
    const fullUrl = this.getFullUrl(url);
    return this.http.delete<Response>(fullUrl, { params });
  }

  downloadFile(url: string, params?: Record<string, string | number | boolean>): Observable<Blob> {
    const fullUrl = this.getFullUrl(url);
    return this.http.get(fullUrl, {
      params,
      responseType: 'blob',
    });
  }
}
