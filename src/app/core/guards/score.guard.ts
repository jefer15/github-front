import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ErrorService } from '../services/error/error.service';

export const scoreGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const score = Number(route.queryParamMap.get('score'));
  const errorService = inject(ErrorService);

  if (!isNaN(score) && score < 30) {
    errorService.setError('Este usuario no puede ser consultado (score < 30).');
    return router.createUrlTree(['/user']);
  }
  return true;
};
