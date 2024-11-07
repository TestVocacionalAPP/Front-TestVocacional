import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var bootstrap: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoginMode = true;

  loginForm: FormGroup;
  registerForm: FormGroup;

  resetPasswordForm: FormGroup;
  validateTokenForm: FormGroup;
  updatePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.validateTokenForm = this.fb.group({
      token: ['', Validators.required]
    });

    this.updatePasswordForm = this.fb.group({
      newPassword: ['', Validators.required]
    });
  }

  // Alternar entre login y registro
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      Swal.fire('Error', 'Completa todos los campos correctamente.', 'error');
      return;
    }

    const { correo, password } = this.loginForm.value;

    this.authService.login(correo, password).subscribe(
      (response) => {
        // Verificar si se recibe el token
        if (response.token) {
          // Mostrar el token en consola para verificar que es correcto
          console.log('Token recibido:', response.token);

          // Almacenar el token en localStorage (puedes también usar sessionStorage)
          localStorage.setItem('token', response.token);

          Swal.fire('Éxito', 'Sesión iniciada correctamente.', 'success');

          this.authService.getRole().subscribe((role) => {
            console.log('Rol del usuario:', role);
            if (role === 'USER') {
              this.router.navigate(['/user']);
            } else if (role === 'ADMIN') {
              this.router.navigate(['/admin/registroTest']);
            } else if (role === 'EXPERTO') {
              this.router.navigate(['/experto']);
            } else {
              Swal.fire('Error', 'Rol no autorizado.', 'error');
            }
          });
        } else {
          Swal.fire(
            'Error',
            'No se recibió el token de autenticación.',
            'error'
          );
        }
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        Swal.fire(
          'Error',
          'Nombre de usuario o contraseña incorrectos.',
          'error'
        );
      }
    );
  }

  // Método para registrarse
  onRegister() {
    if (this.registerForm.invalid) {
      Swal.fire('Error', 'Completa todos los campos correctamente.', 'error');
      return;
    }

    const userData = this.registerForm.value;

    this.authService.register(userData).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Cuenta creada correctamente.', 'success');
        // Redirigir después del registro, por ejemplo, al login
        this.switchMode(); // Cambia a la vista de login
      },
      (error) => {
        Swal.fire('Error', 'Hubo un problema al crear la cuenta.', 'error');
      }
    );
  }
  onSendResetEmail() {
    if (this.resetPasswordForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, ingresa un correo válido.',
      });
      return;
    }

    const email = this.resetPasswordForm.value.email;
    this.authService.resetPassword(email).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Correo enviado',
          text: 'Revisa tu correo para restablecer tu contraseña.',
        });
        this.hideModal('resetPasswordModal');
        this.showModal('validateTokenModal');
      },
      (error) => {
        console.error('Error al restablecer contraseña', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al restablecer contraseña',
          text: 'Hubo un problema. Intenta nuevamente.',
        });
      }
    );
  }

  onValidateToken() {
    if (this.validateTokenForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, ingresa el código correctamente.',
      });
      return;
    }

    const { token } = this.validateTokenForm.value;
    const email = this.resetPasswordForm.value.email;  // Usa el email ingresado anteriormente
    this.authService.validateToken(email, token).subscribe(
      (isValid) => {
        if (isValid) {
          this.hideModal('validateTokenModal');
          this.showModal('updatePasswordModal');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Código inválido',
            text: 'El código de restablecimiento no es válido o ha expirado.',
          });
        }
      },
      (error) => {
        console.error('Error al validar el código', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al validar el código',
          text: 'Hubo un problema. Intenta nuevamente.',
        });
      }
    );
  }

  onUpdatePassword() {
    if (this.updatePasswordForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, ingresa la nueva contraseña correctamente.',
      });
      return;
    }

    const { newPassword } = this.updatePasswordForm.value;
    const email = this.resetPasswordForm.value.email;  // Usa el email ingresado anteriormente
    const token = this.validateTokenForm.value.token;  // Usa el token validado anteriormente
    this.authService.updatePassword(email, token, newPassword).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Contraseña actualizada',
          text: 'Tu contraseña ha sido actualizada exitosamente.',
        });
        this.hideModal('updatePasswordModal');
      },
      (error) => {
        console.error('Error al actualizar la contraseña', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la contraseña',
          text: 'Hubo un problema. Intenta nuevamente.',
        });
      }
    );
  }
  showModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  hideModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}
