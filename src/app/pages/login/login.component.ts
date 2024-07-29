import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DBService } from '../../core/services/db.service';
import { UserService } from '../../core/services/user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  expenseForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: DBService,
    private user: UserService
  ) {
    this.expenseForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    console.log(this.expenseForm);
    if (this.expenseForm.valid) {
      const isUserExist = this.db
        .getData('users')
        .find((user: any) => user.email === this.expenseForm.value.email);
      if (!isUserExist) {
        alert("User doesn't exist, Please register");
      } else if (
        isUserExist &&
        isUserExist.password !== this.expenseForm.value.password
      ) {
        alert('Invalid username or password');
      } else {
        this.user.setLoggedInUser(this.expenseForm.value.email);
        this.router.navigate(['/']);
      }
    } else this.expenseForm.markAllAsTouched();
  }
  login() {}
  register() {
    this.router.navigate(['/register']);
  }
}
