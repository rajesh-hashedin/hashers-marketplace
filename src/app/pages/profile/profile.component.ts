import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Product } from '../../core/models/common.model';
import { DBService } from '../../core/services/db.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  index: number = 0;
  loggedInUser = { name: '', mobile: '', email: '' };
  products: Product[] = [];
  constructor(private user: UserService, private db: DBService) {
    this.loggedInUser = this.user.getLoggedInUser();
    this.products = this.db
      .getData('products')
      .filter(
        (product: Product) => product.ownerEmail === this.loggedInUser.email
      );
    console.log(this.products);
  }
  onSelect(i: number) {
    this.index = i;
  }
}
