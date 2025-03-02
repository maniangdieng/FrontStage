import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importer AuthService


@Injectable({
  providedIn: 'root',
})
export class CandidatureService {
  private apiUrl = 'http://localhost:8080/api'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Méthode pour soumettre une candidature d'ancien candidat
  soumettreAncienCandidature(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}` // Inclure le token JWT
    });
    return this.http.post(`${this.apiUrl}/candidature/ancien`, formData, { headers });
  }

  // Méthode pour soumettre une candidature de nouveau candidat
  soumettreNouveauCandidature(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}` // Inclure le token JWT
    });
    return this.http.post(`${this.apiUrl}/candidature/nouveau`, formData, { headers });
  }
}