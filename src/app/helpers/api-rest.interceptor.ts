import { HTTP_INTERCEPTORS, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const apiRestInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    let authReq;
    const authToken = authService.getToken();

    console.log(authToken);

    if (authToken != null) {
        authReq = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
    }

    return next(authReq);
};
