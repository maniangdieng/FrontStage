import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '@app/constantes/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Importer ReactiveFormsModule

import { HeaderComponent } from '@app/constantes/header/header.component';

@Component({
  standalone: true,
  selector: 'app-dashboard-drc',
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent,    ReactiveFormsModule ],
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

    // Envoyer les données au backend
    this.http.post('http://localhost:8080/api/drc/utilisateurs', userData).subscribe({
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