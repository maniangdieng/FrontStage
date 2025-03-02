import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/login'; // URL de votre backend

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour se connecter
  login(email: string, password: string) {
    return this.http.post<any>(this.loginUrl, { email, password }).pipe(
      map((response) => {
        if (response.success) {
          // Stocker le token JWT et le rôle de l'utilisateur dans le localStorage
          localStorage.setItem('currentUser', JSON.stringify({ 
            token: response.token, 
            role: response.role 
          }));
        }
        return response;
      })
    );
  }

  // Méthode pour rediriger en fonction du rôle
  redirectToDashboard(role: string): void {
    switch (role) {
      case 'ENSEIGNANT':
        this.router.navigate(['/dashboard-per']);
        break;
      case 'DRC':
        this.router.navigate(['/dashboard-drc']);
        break;
      case 'DRH':
        this.router.navigate(['/dashboard-drh']);
        break;
      case 'DFC':
        this.router.navigate(['/dashboard-dfc']);
        break;
      default:
        this.router.navigate(['/login']); // Redirection par défaut si le rôle n'est pas reconnu
    }
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // Méthode pour obtenir le rôle de l'utilisateur actuel
  getCurrentUserRole(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.role;
  }

  // Méthode pour obtenir le token JWT
  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.token;
  }
}