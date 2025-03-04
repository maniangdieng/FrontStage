import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/login'; // URL de votre backend

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour se connecter
  login(email: string, password: string) {
    return this.http.post<{ token: string; role: string }>(this.loginUrl, { email, password }).pipe(
      map((response) => {
        if (response.token) {
          localStorage.setItem('currentUser', JSON.stringify({
            token: response.token,
            role: response.role
          }));
        }
        return response;
      }),
      catchError((error) => {
        console.error('Erreur de connexion:', error);
        return throwError(() => new Error(error.message || 'Erreur de connexion'));
      })
    );
  }

  // Redirection après connexion selon le rôle
  redirectToDashboard(role: string): void {
    const roleRoutes: { [key: string]: string } = {
      'ENSEIGNANT': '/dashboard-per',
      'DRC': '/dashboard-drc',
      'DRH': '/dashboard-drh',
      'DFC': '/dashboard-dfc'
    };
    this.router.navigate([roleRoutes[role] || '/login']); // Redirection par défaut si rôle inconnu
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // Obtenir le rôle de l'utilisateur connecté
  getCurrentUserRole(): string {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).role : '';
  }

  // Obtenir le token JWT
  getToken(): string {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).token : '';
  }
}
