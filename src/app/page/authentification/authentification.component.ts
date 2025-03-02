import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-authentification',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
  providers: [AuthService],
})
export class AuthentificationComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.success) {
          const role = response.role; // Récupérer le rôle depuis la réponse
          this.authService.redirectToDashboard(role); // Rediriger en fonction du rôle
        } else {
          alert('Identifiants invalides');
        }
      },
      (error) => {
        console.error('Erreur de connexion', error);
        alert('Une erreur s\'est produite lors de la connexion');
      }
    );
  }
}