import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpertoService } from 'src/app/services/ExpertoService';
import { Experto } from 'src/app/models/Experto';
import { EditarExpertoModalComponent } from '../editar-experto-modal/editar-experto-modal.component'; // Importar el nuevo modal de edición
import Swal from 'sweetalert2';
import { CrearExpertoComponent } from '../registro-experto/registro-experto.component';

@Component({
  selector: 'app-experto-list',
  templateUrl: './experto-list.component.html',
  styleUrls: ['./experto-list.component.css']
})
export class ExpertoListComponent implements OnInit {
  expertos: Experto[] = [];

  constructor(private expertoService: ExpertoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerTodosLosExpertos();
  }

  obtenerTodosLosExpertos(): void {
    this.expertoService.obtenerTodosLosExpertos().subscribe({
      next: (expertos) => {
        this.expertos = expertos;
      },
      error: (error) => console.error('Error al obtener expertos:', error)
    });
  }

  // Método para abrir el modal de creación de experto
  openCrearExpertoDialog(): void {
    const dialogRef = this.dialog.open(CrearExpertoComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerTodosLosExpertos(); // Actualizar la lista después de crear un experto
      }
    });
  }

  // Método para editar un experto
  editarExperto(experto: Experto): void {
    console.log('Editar experto:', experto);
    const dialogRef = this.dialog.open(EditarExpertoModalComponent, {
      width: '600px',
      data: experto  // Pasamos los datos del experto a editar
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerTodosLosExpertos(); // Actualizar la lista después de editar
      }
    });
  }

  // Método para eliminar un experto
  eliminarExperto(experto: Experto): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar al experto ${experto.nombre} ${experto.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.expertoService.eliminarExperto(experto.id).subscribe({
          next: () => {
            this.obtenerTodosLosExpertos(); // Actualizar la lista después de eliminar
            Swal.fire('Eliminado!', 'El experto ha sido eliminado.', 'success');
          },
          error: (error) => {
            console.error('Error al eliminar el experto:', error);
            Swal.fire('Error', 'No se pudo eliminar el experto. Intenta de nuevo.', 'error');
          }
        });
      }
    });
  }
}
