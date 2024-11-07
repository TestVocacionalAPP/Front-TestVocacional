import { Component, OnInit } from '@angular/core';
import { HistorialService, HistorialTest } from 'src/app/services/HistorialService';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  historialDataSource: HistorialTest[] = [];
  displayedColumns: string[] = ['numero', 'nombreTest', 'fecha', 'categoriaMayorInteres', 'categoriaMayorAptitud', 'acciones'];
  loading: boolean = true;
  error: string | null = null;

  constructor(private historialService: HistorialService) {}

  ngOnInit(): void {
    this.obtenerHistorial();
  }

  obtenerHistorial(): void {
    this.historialService.obtenerHistorialPorUsuario().subscribe(
      (data: HistorialTest[]) => {
        this.historialDataSource = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Error al cargar el historial. Inténtalo de nuevo más tarde.';
        this.loading = false;
        console.error('Error al obtener el historial:', error);
      }
    );
  }

  descargarPDF(historial: HistorialTest): void {
    this.historialService.descargarPDF(historial.id).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resultado_test_${historial.id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al descargar el PDF:', error);
      }
    );
  }
}
