import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/models/Pregunta';
import { TestService } from 'src/app/services/test.service';
import { RespuestaDTO } from 'src/app/models/RespuestaDTO';
import { RespuestasService } from 'src/app/services/Respuesta.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

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
  isLoading: boolean = false;
  mostrarBotonEnviar: boolean = false;

  constructor(
    private testService: TestService,
    private respuestasService: RespuestasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas(): void {
    this.testService.obtenerPreguntasPorTest(this.idTest).subscribe(
      (data) => {
        this.preguntas = data.preguntas;
        this.isLoading = false;
      },
      (error) => {
        console.error('No se pudieron cargar las preguntas.', error);
      }
    );
  }

  obtenerRespuesta(idPregunta: number): number | null {
    const respuesta = this.respuestas.find(r => r.idPregunta === idPregunta);
    return respuesta ? respuesta.valor : null;
  }

  responder(idPregunta: number, esPositiva: boolean): void {
    const respuesta: RespuestaDTO = {
      idPregunta,
      valor: esPositiva ? 1 : 0
    };

    const index = this.respuestas.findIndex(r => r.idPregunta === idPregunta);
    if (index !== -1) {
      this.respuestas[index] = respuesta;
    } else {
      this.respuestas.push(respuesta);
    }

    if (this.preguntaActual === this.preguntas.length - 1) {
      this.mostrarBotonEnviar = true;
    } else {
      this.siguientePregunta();
    }
  }

  siguientePregunta(): void {
    if (this.preguntaActual < this.preguntas.length - 1) {
      this.preguntaActual++;
      this.actualizarSeleccion();
    }
  }

  anteriorPregunta(): void {
    if (this.preguntaActual > 0) {
      this.preguntaActual--;
      this.actualizarSeleccion();
    }
  }

  actualizarSeleccion(): void {
    // Forzar la actualización del estado de los botones basados en la respuesta actual
    const respuesta = this.obtenerRespuesta(this.preguntas[this.preguntaActual].idPregunta);
    if (respuesta !== null) {
      const botones = document.querySelectorAll('.button-container button');
      botones.forEach((boton, index) => {
        if ((respuesta === 1 && index === 0) || (respuesta === 0 && index === 1)) {
          boton.classList.add('selected');
        } else {
          boton.classList.remove('selected');
        }
      });
    }
  }

  enviarRespuestas(): void {
    if (this.respuestas.length < this.preguntas.length) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes responder todas las preguntas para enviar tus respuestas'
      })
      return;
    }

    this.isLoading = true;
    this.respuestasService.enviarRespuestas(this.respuestas, this.idTest).subscribe(
      (respuesta) => {
        this.isLoading = false;
        alert('Respuestas enviadas correctamente');
        const historialTestId = respuesta.historialTestId;
        this.router.navigate([`/user/resultado-test/${this.idTest}/${historialTestId}`]);
      },
      (error) => {
        this.isLoading = false;
        alert('Error al enviar las respuestas');
      }
    );
  }
}
