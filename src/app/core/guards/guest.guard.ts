import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Guard cho các route dành cho guest (chưa đăng nhập)
 * Nếu đã đăng nhập thì redirect về home
 */
export const GuestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return true;
  }

  // Redirect về dashboard nếu đã đăng nhập
  return router.createUrlTree(['/dashboard']);
};
