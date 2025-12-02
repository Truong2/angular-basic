import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError, defer, Observable } from 'rxjs';

let isRefreshing = false;
let requestQueue: ((token: string) => void)[] = [];

export const refreshInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401) return throwError(() => err);

      if (!isRefreshing) {
        isRefreshing = true;

        return auth.refreshToken().pipe(
          switchMap((resp: any) => {
            const newToken = resp.access_token;
            localStorage.setItem('access_token', newToken);
            isRefreshing = false;

            requestQueue.forEach((cb) => cb(newToken));
            requestQueue = [];

            return next(addToken(req, newToken));
          }),
          catchError((refreshErr) => {
            auth.logout({});
            localStorage.clear();
            window.location.href = '/login';
            return throwError(() => refreshErr);
          })
        );
      }

      return defer(() => {
        return new Observable<HttpEvent<any>>((observer) => {
          requestQueue.push((token: string) => {
            next(addToken(req, token)).subscribe(observer);
          });
        });
      });
    })
  );
};

function addToken(req: HttpRequest<any>, token: string) {
  return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
}
