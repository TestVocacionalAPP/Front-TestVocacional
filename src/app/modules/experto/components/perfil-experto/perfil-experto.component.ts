import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertoPerfilDTO, ExpertoService } from 'src/app/services/ExpertoService';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-experto',
  templateUrl: './perfil-experto.component.html',
  styleUrls: ['./perfil-experto.component.css']
})
export class PerfilExpertoComponent implements OnInit {
  perfil: ExpertoPerfilDTO = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    especialidad: '',
    descripcion: '',
    tarifa: 0,
    likes: 0,
    imagenBase64: ''
  };
  editMode: boolean = false;

  constructor(private expertoService: ExpertoService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.obtenerPerfil();
  }

  obtenerPerfil(): void {
    this.expertoService.obtenerPerfil().subscribe((data) => {
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
    this.expertoService.actualizarPerfil(this.perfil).subscribe(() => {
      console.log('Perfil actualizado');
      this.editMode = false;
    });

    if (this.perfil.imagenBase64) {
      this.expertoService.actualizarImagenPerfil(this.perfil.imagenBase64).subscribe(() => {
        console.log('Imagen de perfil actualizada');
      });
    }
  }

  regresar(): void {
    this.location.back();
  }
}
