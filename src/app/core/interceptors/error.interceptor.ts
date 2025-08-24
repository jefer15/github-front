import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorService } from '../services/error/error.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Ocurrió un error inesperado.';
      if (error.status === 404) message = 'Recurso no encontrado.';
      else if (error.status === 403) message = 'Acceso denegado.';
      else if (error.status === 500) message = 'Error interno del servidor.';
      errorService.setError(message);
      return throwError(() => error);
    })
  );
};
