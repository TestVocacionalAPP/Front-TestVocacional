import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpertoCreateDTO } from 'src/app/models/ExpertoCreateDTO';
import { ExpertoService } from 'src/app/services/ExpertoService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-experto',
  templateUrl: './registro-experto.component.html',
  styleUrls: ['./registro-experto.component.css']
})
export class CrearExpertoComponent {
  expertoData: ExpertoCreateDTO = {
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    password: '',
    especialidad: '',
    descripcion: '',
    tarifa: 0,
  };

  constructor(
    private expertoService: ExpertoService,
    private dialogRef: MatDialogRef<CrearExpertoComponent> // Inyecta MatDialogRef
  ) {}

  crearExperto() {
    this.expertoService.crearExperto(this.expertoData).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Experto creado exitosamente', 'success');
        this.dialogRef.close(true); // Cierra el diálogo y devuelve `true` para indicar éxito
      },
      error: (error) => {
        console.error('Error al crear experto:', error);
        Swal.fire('Error', 'No se pudo crear el experto', 'error');
      },
    });
  }
}
