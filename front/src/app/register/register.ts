import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { RegisterService } from '../Core/Services/Register/register.service';
import { RegisterResponse } from '../interfaces/register.interface';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private registerService = inject(RegisterService);

  registerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    agreeToPolicies: [false, Validators.requiredTrue]
  });


  onSubmit(): void {

    if (!this.registerForm.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos correctamente.'
      });
      return;
    }

    const data = this.registerForm.getRawValue();

    this.registerService.register(data).subscribe({
      next: (response: RegisterResponse) => {

        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: response.message,
        });

        this.router.navigateByUrl('/login');
      },

      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrarte',
          text: err.error?.message ?? 'Error inesperado. Intenta más tarde.'
        });
      }
    });
  }
}
