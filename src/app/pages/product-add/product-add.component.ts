import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DBService } from '../../core/services/db.service';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../../core/services/user.service';
@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  productAddForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: DBService,
    private user: UserService
  ) {
    this.productAddForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.productAddForm.valid) {
      this.db.setData('products', {
        id: uuidv4(),
        ownerEmail: this.user.getLoggedInUser().email,
        ownerName: this.user.getLoggedInUser().name,
        ...this.productAddForm.value,
        request: [],
      });
      this.router.navigate(['/']);
    } else this.productAddForm.markAllAsTouched();
  }
}
