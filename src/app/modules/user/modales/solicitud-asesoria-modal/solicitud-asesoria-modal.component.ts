import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsesoriaService, AsesoriaCreateDTO } from 'src/app/services/AsesoriaService';

@Component({
  selector: 'app-solicitud-asesoria-modal',
  templateUrl: './solicitud-asesoria-modal.component.html',
  styleUrls: ['./solicitud-asesoria-modal.component.css']
})
export class SolicitudAsesoriaModalComponent {
  solicitudForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<SolicitudAsesoriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { expertoId: number },
    private fb: FormBuilder,
    private asesoriaService: AsesoriaService
  ) {
    this.solicitudForm = this.fb.group({
      asunto: ['', [Validators.required, Validators.maxLength(100)]],
      fechaSolicitada: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]], // Campo añadido
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  enviarSolicitud(): void {
    if (this.solicitudForm.valid) {
      const solicitudData: AsesoriaCreateDTO = {
        expertoId: this.data.expertoId,
        ...this.solicitudForm.value
      };

      this.asesoriaService.solicitarAsesoria(solicitudData).subscribe(
        (response) => {
          console.log('Solicitud enviada exitosamente:', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error al enviar la solicitud:', error);
        }
      );
    }
  }
}
