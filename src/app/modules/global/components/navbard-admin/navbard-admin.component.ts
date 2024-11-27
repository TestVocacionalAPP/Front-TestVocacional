import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbard-admin',
  templateUrl: './navbard-admin.component.html',
  styleUrls: ['./navbard-admin.component.css']
})
export class NavbardAdminComponent {

  constructor(private authService: AuthService, private router: Router) {}



  // Método de cierre de sesión
  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de cerrar sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0e6364',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['']);
      }
    });
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
