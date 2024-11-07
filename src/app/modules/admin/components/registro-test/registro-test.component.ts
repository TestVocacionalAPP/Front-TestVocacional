import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TestCreationDTO } from 'src/app/models/TestCreationDT';
import { TestService } from 'src/app/services/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-test',
  templateUrl: './registro-test.component.html',
  styleUrls: ['./registro-test.component.css'],
})
export class RegistroTestComponent implements OnInit {
  testForm: FormGroup;
  idTest!: number;

  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    private route: ActivatedRoute
  ) {
    this.testForm = this.fb.group({
      nombreTest: ['', Validators.required],
      descripcion: ['', Validators.required],
      preguntas: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

    });
  }

  get preguntas(): FormArray {
    return this.testForm.get('preguntas') as FormArray;
  }

  agregarPregunta(): void {
    const preguntaForm = this.fb.group({
      enunciado: ['', Validators.required],
      puntaje: [0, [Validators.required, Validators.min(1)]],
    });
    this.preguntas.push(preguntaForm);
  }

  eliminarPregunta(index: number): void {
    this.preguntas.removeAt(index);
  }

  guardarTest(): void {
    const titulo = this.testForm.value.nombreTest;
    const fileInput = document.getElementById('excelUpload') as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;

    if (file && titulo) {
      this.testService.crearTestConPreguntas(titulo, file).subscribe(
        (response) => {
          console.log('Test y preguntas creadas exitosamente:', response);

          // Mostrar el mensaje de éxito con SweetAlert2
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'El test y sus preguntas han sido registrados correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 2000, // Desaparece automáticamente en 2 segundos
          });

          // Opcional: resetear el formulario y limpiar el archivo
          this.testForm.reset();
          if (fileInput) {
            fileInput.value = ''; // Limpiar el campo de archivo
          }
        },
        (error) => {
          console.error('Error al crear el test con preguntas:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al registrar el test.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      );
    } else {
      console.error('El título o el archivo no están completos');
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, asegúrese de que el título y el archivo estén completos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }


  cargarExcel(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (this.idTest) {
        this.testService.cargarPreguntasDesdeCSV(file, this.idTest).subscribe(
          () => {
            console.log('Preguntas cargadas exitosamente');
          },
          (error) => {
            console.error('Error al cargar preguntas desde el archivo:', error);
          }
        );
      } else {
        console.error('No se pudo cargar el archivo: ID de Test no encontrado');
      }
    }
  }
}
