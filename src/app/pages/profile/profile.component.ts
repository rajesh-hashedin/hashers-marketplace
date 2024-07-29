import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { IncomingRequest, Product } from '../../core/models/common.model';
import { DBService } from '../../core/services/db.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  index: number = 0;
  loggedInUser = { name: '', mobile: '', email: '' };
  products: Product[] = [];
  incomingRequest: IncomingRequest[] = [];
  sentRequest: Product[] = [];
  constructor(private user: UserService, private db: DBService) {
    this.loggedInUser = this.user.getLoggedInUser();
    this.products = this.db
      .getData('products')
      .filter(
        (product: Product) => product.ownerEmail === this.loggedInUser.email
      );
    this.db.getData('products').forEach((prod: any) => {
      if (
        prod.request.find((req: any) => req.email === this.loggedInUser.email)
      ) {
        this.sentRequest.push(prod);
      }
    });
  }
  onSelect(i: number) {
    this.index = i;
    if (i === 2) {
      this.incomingRequest = [];
      this.products.forEach((prod: any) => {
        prod.request.forEach((req: any) => {
          this.incomingRequest.push({
            productName: prod.name,
            productPrice: prod.price,
            productDescription: prod.description,
            customerName: req.name,
            customerMobile: req.mobile,
            customerMessage: req.message,
          });
        });
      });
      console.log(this.incomingRequest);
    }
  }
}
