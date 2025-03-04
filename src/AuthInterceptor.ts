import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Ajouter le token JWT
      }
    });
    return next(authReq); // Passer la requête modifiée au prochain intercepteur ou au backend
  }

  return next(req); // Si aucun token n'est trouvé, passer la requête originale
};