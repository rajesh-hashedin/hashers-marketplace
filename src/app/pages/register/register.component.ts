import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidators } from './password.validator';
import { Router } from '@angular/router';
import { DBService } from '../../core/services/db.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: DBService
  ) {
    this.registerForm = this.fb.group(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$'),
        ]),
        mobile: new FormControl('', [
          Validators.required,
          Validators.pattern('^[2-9]{2}[0-9]{8}$'),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validator: CustomValidators.MatchingPasswords }
    );
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.db.setData('users', {
        id: uuidv4(),
        name: this.registerForm.value.name,
        mobile: this.registerForm.value.mobile,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      });
      this.router.navigate(['/login']);
    } else this.registerForm.markAllAsTouched();
  }
  login() {
    this.router.navigate(['/login']);
  }
}
