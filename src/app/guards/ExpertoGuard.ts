import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpertoGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.getRole().pipe(
      map(role => {
        if (role === 'EXPERTO') {
          return true;
        } else {
          this.router.navigate(['/no-permission']); // Redirige si el rol no es EXPERTO
          return false;
        }
      })
    );
  }
}
