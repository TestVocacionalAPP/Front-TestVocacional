// crear-recurso.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  RecursoCreateDTO,
  RecursoResponseDTO,
  RecursoService,
} from 'src/app/services/RecursoService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-recurso',
  templateUrl: './crear-recurso.component.html',
  styleUrls: ['./crear-recurso.component.css'],
})
export class CrearRecursoComponent implements OnInit {
  recursoData: RecursoCreateDTO = {
    titulo: '',
    descripcion: '',
    tipoRecurso: '',
    urlRecurso: '',
    categoriaRecurso: 'GRATUITO', // Valor predeterminado para categoría
    precio: 0 // Inicializar el precio en 0 o con un valor predeterminado
  };
  editMode = false;

  constructor(
    private recursoService: RecursoService,
    public dialogRef: MatDialogRef<CrearRecursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecursoResponseDTO
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.recursoData = {
        ...this.data,
        categoriaRecurso: this.data.categoriaRecurso || 'GRATUITO',
        precio: this.data.precio || 0 // Asigna el precio o un valor predeterminado
      };
      this.editMode = true;
    }
  }

  guardarRecurso() {
    if (this.editMode) {
      this.recursoService
        .actualizarRecurso(this.data.id, this.recursoData)
        .subscribe({
          next: () => {
            Swal.fire('Éxito', 'Recurso actualizado exitosamente', 'success');
            this.dialogRef.close(true);
          },
          error: () =>
            Swal.fire('Error', 'No se pudo actualizar el recurso', 'error'),
        });
    } else {
      this.recursoService.crearRecurso(this.recursoData).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Recurso creado exitosamente', 'success');
          this.dialogRef.close(true);
        },
        error: () => Swal.fire('Error', 'No se pudo crear el recurso', 'error'),
      });
    }
  }
}
