import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../Core/Services/Auth/auth.service';
import { UserSessionService } from '../Core/Services/UserSession/user-session.service';
import { LoginResponse } from '../interfaces/auth.interface';
import { Footer } from '../Components/footer/footer';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private userSession = inject(UserSessionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(): void {

    if (!this.loginForm.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Revisa los campos antes de continuar.'
      });
      return;
    }

    const formData = this.loginForm.value;

    this.authService.login(formData).subscribe({
      next: (response: LoginResponse) => {

        localStorage.setItem('token', response.data.token);
        this.userSession.username = response.data.user.username;
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: response.message,
        });

        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';

        this.router.navigateByUrl(returnUrl);
      },

      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: err.message ?? 'Error inesperado. Intente de nuevo.'
        });
      }
    });
  }
}
