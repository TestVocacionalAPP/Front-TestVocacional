import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsesoriaResponseDTO } from 'src/app/services/AsesoriaService';
import { AuthService } from 'src/app/services/auth.service';
import { ExpertoService } from 'src/app/services/ExpertoService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbard-experto',
  templateUrl: './navbard-experto.component.html',
  styleUrls: ['./navbard-experto.component.css'],
})
export class NavbardExpertoComponent implements OnInit {
  notificaciones: AsesoriaResponseDTO[] = []; // Array para almacenar notificaciones

  constructor(
    private authService: AuthService,
    private router: Router,
    private expertoService: ExpertoService
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.obtenerNotificaciones();
    }
  }

  obtenerNotificaciones(): void {
    this.expertoService.obtenerNotificaciones().subscribe({
      next: (notificaciones) => (this.notificaciones = notificaciones),
      error: (error) => console.error('Error al obtener notificaciones:', error),
    });
  }

  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de cerrar sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
