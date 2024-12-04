import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService)
  const router = inject(Router)

  if(tokenService.isToken()){
    return true;
  }

  router.navigate(['/'])
  return false
};
