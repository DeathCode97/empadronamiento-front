import { CanActivateFn } from '@angular/router';
import { AuthApiService } from './services/auth-api.service'
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthApiService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['login']); // Redirige al login si no está autenticado
    return false;
  }

  // return true;
};
