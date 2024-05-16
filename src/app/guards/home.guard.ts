import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const homeGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.isLoggedIn.pipe(
        take(1),
        map((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
                router.navigate(['/home']);
                return false;
            }
            return true;
        })
    );
};
