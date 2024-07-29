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
        name: new FormControl('', [Validators.required]),
        mobile: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
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
