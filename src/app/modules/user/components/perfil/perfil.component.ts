import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioPerfilDTO } from 'src/app/models/UsuarioPerfilDTO';
import { UsuarioUpdateDTO } from 'src/app/models/UsuarioUpdateDTO';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil: UsuarioPerfilDTO = {
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    imagenBase64: ''
  };
  editMode: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerPerfil();
  }

  obtenerPerfil(): void {
    this.authService.obtenerPerfil().subscribe((data) => {
      this.perfil = data;
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.perfil.imagenBase64 = (reader.result as string).split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }

  guardarCambios(): void {
    if (this.perfil) {
      const perfilActualizado: UsuarioUpdateDTO = {
        nombre: this.perfil.nombre,
        apellido: this.perfil.apellido,
        telefono: this.perfil.telefono,
        correo: this.perfil.correo
      };

      // Actualizar los datos del perfil
      this.authService.actualizarPerfil(perfilActualizado).subscribe(() => {
        console.log('Perfil actualizado');
        this.editMode = false;
      });

      // Si hay una imagen nueva, actualizar la imagen del perfil
      if (this.perfil.imagenBase64) {
        this.authService.actualizarImagenPerfil(this.perfil.imagenBase64).subscribe(() => {
          console.log('Imagen de perfil actualizada');
        });
      }
    }
  }

  eliminarCuenta(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará tu cuenta permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.eliminarCuenta().subscribe(() => {
          Swal.fire(
            'Eliminada',
            'Tu cuenta ha sido eliminada exitosamente.',
            'success'
          ).then(() => {
            this.router.navigate(['/']);
          });
        });
      }
    });
  }
}
