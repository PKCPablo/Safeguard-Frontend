import { HTTP_INTERCEPTORS, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const apiRestInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let intReq = req;
  const token = authService.getToken();

  if (token != null) {
    intReq = req.clone({ headers: req.headers.set("Authorization", "Bearer " + token)})
  }

  return next(intReq);
};
