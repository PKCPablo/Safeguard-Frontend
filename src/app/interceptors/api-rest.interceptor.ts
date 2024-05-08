import { HttpInterceptorFn } from '@angular/common/http';

export const apiRestInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
