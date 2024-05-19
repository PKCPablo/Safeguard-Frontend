import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (!authService.isAuth) {
        return true;
    }

    return router.createUrlTree(['/home']);
};
