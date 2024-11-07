import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carrera } from 'src/app/models/Carrera';
import { RespuestasService } from 'src/app/services/Respuesta.service';

@Component({
  selector: 'app-resultado-test',
  templateUrl: './resultado-test.component.html',
  styleUrls: ['./resultado-test.component.css'],
})
export class ResultadoTestComponent implements OnInit {
  idTest: number = 0;
  historialTestId: number = 0;
  mensajeIntereses: string = '';
  mensajeCarreras: string = '';
  carrerasSugeridas: Carrera[] = [];

  constructor(
    private route: ActivatedRoute,
    private respuestasService: RespuestasService
  ) {}

  ngOnInit(): void {
    const idTestParam = this.route.snapshot.paramMap.get('idTest');
    const historialTestIdParam = this.route.snapshot.paramMap.get('historialTestId');

    if (idTestParam && historialTestIdParam) {
      this.idTest = +idTestParam;
      this.historialTestId = +historialTestIdParam;
      this.obtenerResultados();
      this.obtenerCarrerasSugeridas();
    } else {
      console.error('Error: Parámetros de ruta inválidos.');
    }
  }

  obtenerResultados(): void {
    this.respuestasService.calcularResultados(this.idTest, this.historialTestId).subscribe(
      (data: any) => {
        this.mensajeIntereses = data['mensajeIntereses'] || '';
        this.mensajeCarreras = data['mensajeCarreras'] || '';
      },
      (error) => {
        console.error('Error al obtener los resultados:', error);
      }
    );
  }

  obtenerCarrerasSugeridas(): void {
    this.respuestasService.sugerenciasCarrera(this.idTest, this.historialTestId).subscribe(
      (carreras: Carrera[]) => {
        this.carrerasSugeridas = carreras.map((carrera: Carrera) => {
          const imagenId = carrera.imagen ? carrera.imagen.split('/d/')[1]?.split('/')[0] : null;
          const imagenUrl = imagenId ? `https://drive.google.com/uc?export=download&id=${imagenId}` : '';
          return { ...carrera, imagenProcesada: imagenUrl };
        });
      },
      (error) => {
        console.error('Error al obtener las carreras sugeridas:', error);
      }
    );
  }
}
