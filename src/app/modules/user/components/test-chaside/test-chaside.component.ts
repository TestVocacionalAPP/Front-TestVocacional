import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/models/Pregunta';
import { TestService } from 'src/app/services/test.service';

import { RespuestaDTO } from 'src/app/models/RespuestaDTO';
import { RespuestasService } from 'src/app/services/Respuesta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-chaside',
  templateUrl: './test-chaside.component.html',
  styleUrls: ['./test-chaside.component.css']
})
export class TestChasideComponent implements OnInit {
  preguntas: Pregunta[] = [];
  respuestas: RespuestaDTO[] = [];
  preguntaActual: number = 0;
  idTest = 1;

  constructor(private testService: TestService, private respuestasService: RespuestasService, private router: Router) {}


  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas(): void {
    this.testService.obtenerPreguntasPorTest(this.idTest).subscribe(
      (data) => {
        console.log('Datos recibidos de preguntas:', data);
        this.preguntas = data.preguntas;
      },
      (error) => {
        console.error('No se pudieron cargar las preguntas.', error);
      }
    );
  }


  responder(idPregunta: number, esPositiva: boolean): void {
    const respuesta: RespuestaDTO = {
      idPregunta: idPregunta,
      valor: esPositiva ? 1 : 0
    };

    this.respuestas.push(respuesta);

    if (this.preguntaActual < this.preguntas.length - 1) {
      this.siguientePregunta();
    } else {
      // Enviar respuestas al backend al finalizar el cuestionario
      this.enviarRespuestas();
    }
  }

  enviarRespuestas(): void {
    console.log('Datos enviados:', this.respuestas);
    this.respuestasService.enviarRespuestas(this.respuestas, this.idTest).subscribe(
      (respuesta) => {
        console.log('Respuestas enviadas:', respuesta);
        alert('Respuestas enviadas correctamente');

        // Redirigir al componente de resultados usando el historialTestId retornado
        const historialTestId = respuesta.historialTestId;
        this.router.navigate([`/user/resultado-test/${this.idTest}/${historialTestId}`]);
      },
      (error) => {
        console.error('Error al enviar las respuestas:', error);
        alert('Error al enviar las respuestas');
      }
    );
  }


  anteriorPregunta(): void {
    if (this.preguntaActual > 0) {
      this.preguntaActual--;
    }
  }

  siguientePregunta(): void {
    if (this.preguntaActual < this.preguntas.length - 1) {
      this.preguntaActual++;
    }
  }
}
