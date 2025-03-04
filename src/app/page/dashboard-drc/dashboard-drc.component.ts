import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importer HttpHeaders
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '@app/constantes/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Importer ReactiveFormsModule
import { HeaderComponent } from '@app/constantes/header/header.component';

@Component({
  standalone: true,
  selector: 'app-dashboard-drc',
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './dashboard-drc.component.html',
  styleUrls: ['./dashboard-drc.component.css']
})
export class DashboardDrcComponent implements OnInit {
  userForm: FormGroup;
  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialisation du formulaire
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      motDePasse: ['', Validators.required],
      telephone: [''],
      role: ['ROLE_DRC', Validators.required] // Rôle par défaut
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.handleFragment();
      }
    });
  }

  handleFragment(): void {
    const fragment = this.router.parseUrl(this.router.url).fragment;
    if (fragment) {
      document.querySelectorAll('.content-section').forEach((section) => {
        (section as HTMLElement).style.display = 'none';
      });

      const targetSection = document.getElementById(fragment);
      if (targetSection) {
        targetSection.style.display = 'block';
      }
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;
    const currentUser = localStorage.getItem('currentUser');
    const token = currentUser ? JSON.parse(currentUser).token : null;
    console.log("Token récupéré :", token);

    

    // Vérifier si le token existe
    if (!token) {
      this.message = 'Token JWT manquant. Veuillez vous reconnecter.';
      this.isSuccess = false;
      return;
    }
    
    
    

    // Ajouter l'en-tête Authorization avec le token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    // Envoyer les données au backend avec l'en-tête
    this.http.post('http://localhost:8080/api/drc/utilisateurs', userData, { headers }).subscribe({
      next: (response) => {
        this.message = 'Utilisateur créé avec succès !';
        this.isSuccess = true;
        this.userForm.reset(); // Réinitialiser le formulaire
      },
      error: (error) => {
        this.message = 'Erreur lors de la création de l\'utilisateur : ' + error.message;
        this.isSuccess = false;
      }
    });
  }
}
