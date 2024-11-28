import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpertoService } from 'src/app/services/ExpertoService';
import { ExpertoUpdateDTO } from 'src/app/models/ExpertoUpdateDTO';  // Asegúrate de importar ExpertoUpdateDTO
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-experto-modal',
  templateUrl: './editar-experto-modal.component.html',
  styleUrls: ['./editar-experto-modal.component.css']
})
export class EditarExpertoModalComponent {
  expertoData: ExpertoUpdateDTO;  // Cambié el tipo a ExpertoUpdateDTO

  constructor(
    private expertoService: ExpertoService,
    private dialogRef: MatDialogRef<EditarExpertoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Aquí recibes los datos del experto
  ) {
    // Inicializamos los datos del experto para edición
    this.expertoData = {
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      correo: data.correo,
      especialidad: data.especialidad,
      descripcion: data.descripcion,
      tarifa: data.tarifa
    };
  }

  // Método para guardar los cambios
  guardarExperto(): void {
    this.expertoService.actualizarExperto(this.data.id, this.expertoData).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Experto actualizado exitosamente', 'success');
        this.dialogRef.close(true);  // Cierra el modal y notifica éxito
      },
      error: (error) => {
        console.error('Error al actualizar experto:', error);
        Swal.fire('Error', 'No se pudo actualizar el experto', 'error');
      }
    });
  }
}
