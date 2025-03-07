import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '@app/constantes/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '@app/constantes/header/header.component';
import { HttpParams } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-dashboard-drc',
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './dashboard-drc.component.html',
  styleUrls: ['./dashboard-drc.component.css']
})
export class DashboardDrcComponent implements OnInit {
  userForm: FormGroup;
  periodeForm: FormGroup;
  message: string = '';
  isSuccess: boolean = false;
  periodeMessage: string = '';
  isPeriodeSuccess: boolean = false;
  periodes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialisation du formulaire utilisateur
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      motDePasse: ['', Validators.required],
      motDePasseEnClair: ['', Validators.required], // Ajoutez ce champ
      telephone: [''],
      role: ['DRC', Validators.required]
    });

    // Initialisation du formulaire période de candidature
    this.periodeForm = this.fb.group({
      nom: ['', Validators.required],
      dateOuverture: ['', Validators.required],
      dateFermeture: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.handleFragment();
      }
    });

    this.loadPeriodes();
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

    if (!token) {
      this.message = 'Token JWT manquant. Veuillez vous reconnecter.';
      this.isSuccess = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    this.http.post('http://localhost:8080/api/drc/utilisateurs', userData, { headers }).subscribe({
      next: (response) => {
        this.message = 'Utilisateur créé avec succès !';
        this.isSuccess = true;
        this.userForm.reset();
      },
      error: (error) => {
        this.message = 'Erreur lors de la création de l\'utilisateur : ' + error.message;
        this.isSuccess = false;
      }
    });
  }

 

  onPeriodeSubmit(): void {
    if (this.periodeForm.invalid) {
      return;
    }
  
    const periodeData = this.periodeForm.value;
  
    // Convertir les champs de date en objets Date
    periodeData.dateOuverture = new Date(periodeData.dateOuverture);
    periodeData.dateFermeture = new Date(periodeData.dateFermeture);
  
    const currentUser = localStorage.getItem('currentUser');
    const token = currentUser ? JSON.parse(currentUser).token : null;
  
    if (!token) {
      this.periodeMessage = 'Token JWT manquant. Veuillez vous reconnecter.';
      this.isPeriodeSuccess = false;
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
  
    // Convertir les dates en chaînes ISO
    const params = new HttpParams()
      .set('nom', periodeData.nom)
      .set('dateOuverture', periodeData.dateOuverture) 
      .set('dateFermeture', periodeData.dateFermeture);
  
    this.http.post('http://localhost:8080/api/cohortes/ouvrir', null, { headers, params }).subscribe({
      next: (response) => {
        this.periodeMessage = 'Période de candidature créée avec succès !';
        this.isPeriodeSuccess = true;
        this.periodeForm.reset();
        this.loadPeriodes();
      },
      error: (error) => {
        this.periodeMessage = 'Erreur lors de la création de la période de candidature : ' + error.message;
        this.isPeriodeSuccess = false;
      }
    });
  }

  semiCloturerPeriode(id: number): void {
    const currentUser = localStorage.getItem('currentUser');
    const token = currentUser ? JSON.parse(currentUser).token : null;

    if (!token) {
        this.periodeMessage = 'Token JWT manquant. Veuillez vous reconnecter.';
        this.isPeriodeSuccess = false;
        return;
    }

    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
    });

    this.http.put(`http://localhost:8080/api/cohortes/${id}/semi-cloture`, {}, { headers }).subscribe({
        next: (response) => {
            this.periodeMessage = 'Période mise en semi-clôture avec succès !';
            this.isPeriodeSuccess = true;
            this.loadPeriodes();
        },
        error: (error) => {
            this.periodeMessage = 'Erreur lors de la semi-clôture de la période : ' + error.message;
            this.isPeriodeSuccess = false;
        }
    });
}

cloturerDefinitivement(id: number): void {
    const currentUser = localStorage.getItem('currentUser');
    const token = currentUser ? JSON.parse(currentUser).token : null;

    if (!token) {
        this.periodeMessage = 'Token JWT manquant. Veuillez vous reconnecter.';
        this.isPeriodeSuccess = false;
        return;
    }

    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
    });

    this.http.put(`http://localhost:8080/api/cohortes/${id}/cloture-definitive`, {}, { headers }).subscribe({
        next: (response) => {
            this.periodeMessage = 'Période clôturée définitivement avec succès !';
            this.isPeriodeSuccess = true;
            this.loadPeriodes();
        },
        error: (error) => {
            this.periodeMessage = 'Erreur lors de la clôture définitive de la période : ' + error.message;
            this.isPeriodeSuccess = false;
        }
    });
}

  fermerPeriode(id: number): void {
    const currentUser = localStorage.getItem('currentUser');
    const token = currentUser ? JSON.parse(currentUser).token : null;

    if (!token) {
      this.periodeMessage = 'Token JWT manquant. Veuillez vous reconnecter.';
      this.isPeriodeSuccess = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    this.http.put(`http://localhost:8080/api/cohortes/${id}/fermer`, {}, { headers }).subscribe({
      next: (response) => {
        this.periodeMessage = 'Période de candidature fermée avec succès !';
        this.isPeriodeSuccess = true;
        this.loadPeriodes();
      },
      error: (error) => {
        this.periodeMessage = 'Erreur lors de la fermeture de la période de candidature : ' + error.message;
        this.isPeriodeSuccess = false;
      }
    });
  }

  loadPeriodes(): void {
    const currentUser = localStorage.getItem('currentUser');
    const token = currentUser ? JSON.parse(currentUser).token : null;

    if (!token) {
      this.periodeMessage = 'Token JWT manquant. Veuillez vous reconnecter.';
      this.isPeriodeSuccess = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    this.http.get('http://localhost:8080/api/cohortes/ouvertes', { headers }).subscribe({
      next: (response: any) => {
        this.periodes = response;
      },
      error: (error) => {
        this.periodeMessage = 'Erreur lors du chargement des périodes de candidature : ' + error.message;
        this.isPeriodeSuccess = false;
      }
    });
  }
}