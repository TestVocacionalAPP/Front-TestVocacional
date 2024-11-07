import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AsesoriaService } from 'src/app/services/AsesoriaService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbard',
  templateUrl: './navbard.component.html',
  styleUrls: ['./navbard.component.css']
})
export class NavbardComponent implements OnInit {
  notificaciones: string[] = []; // Array para almacenar las notificaciones
  menuVisible = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private asesoriaService: AsesoriaService // Inyección del servicio de notificaciones
  ) {}

  ngOnInit(): void {
    this.obtenerNotificaciones(); // Llamada para cargar las notificaciones al iniciar
  }

  obtenerNotificaciones(): void {
    this.asesoriaService.verificarYNotificarCitas().subscribe(
      (notificaciones: string[]) => {
        this.notificaciones = notificaciones;
      },
      (error) => {
        console.error('Error al obtener notificaciones:', error);
      }
    );
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
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
      cancelButtonText: 'Cancelar'
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

  tieneNotificaciones(): boolean {
    return this.notificaciones.length > 0;
  }
}
