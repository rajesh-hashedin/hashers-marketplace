import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../core/models/common.model';
import { DBService } from '../../core/services/db.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-description.component.html',
  styleUrl: './product-description.component.css',
})
export class ProductDescriptionComponent implements OnInit {
  product: Product;
  sendMessageForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private db: DBService,
    private fb: FormBuilder,
    private user: UserService,
    private router: Router
  ) {
    this.product = {
      id: '',
      name: '',
      price: '',
      description: '',
      request: [],
      alreadySent: false,
      ownerEmail: '',
      ownProduct: false,
    };
    this.sendMessageForm = this.fb.group({
      message: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.product = this.db
      .getData('products')
      .find((product: Product) => product.id === id);
    const loggedInUser = this.user.getLoggedInUser();
    if (this.product.request.find((user) => user.id === loggedInUser.id)) {
      this.product.alreadySent = true;
    }
    if (this.product.ownerEmail === loggedInUser.email) {
      this.product.ownProduct = true;
    }
  }
  onSubmit() {
    if (this.sendMessageForm.valid) {
      const allData = this.db.getAllData();
      const isProductExist = allData.products.find(
        (prod: any) => prod.id === this.product.id
      );
      if (isProductExist)
        isProductExist.request.push({
          ...this.user.getLoggedInUser(),
          message: this.sendMessageForm.value.message,
        });
      this.db.setAllData(allData);
      this.product.alreadySent = true;
    } else this.sendMessageForm.markAllAsTouched();
  }
}
