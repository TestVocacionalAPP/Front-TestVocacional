import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpertoService } from 'src/app/services/ExpertoService';

import { Experto } from 'src/app/models/Experto';
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
}
