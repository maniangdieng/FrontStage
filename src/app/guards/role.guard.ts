import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Assure-toi que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getCurrentUserRole(); // Récupérer le rôle de l'utilisateur
    const expectedRoles = this.getRolesForRoute(state.url); // Vérifier les rôles autorisés pour cette route

    if (expectedRoles.includes(role)) {
      return true; // Accès autorisé
    } else {
      this.router.navigate(['/unauthorized']); // Redirection si non autorisé
      return false;
    }
  }

  private getRolesForRoute(url: string): string[] {
    // Définir les rôles attendus pour chaque route
    const roleMapping: { [key: string]: string[] } = {
        '/dashboard-per': ['ENSEIGNANT'],
        '/dashboard-drc': ['DRC'],  
        '/dashboard-drh': ['DRH'], 
        '/dashboard-dfc': ['DFC']  
    };

    return roleMapping[url] || [];
}
}
