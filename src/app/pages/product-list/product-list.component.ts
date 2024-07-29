import { Component } from '@angular/core';
import { Product } from '../../core/models/common.model';
import { DBService } from '../../core/services/db.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];
  constructor(
    private db: DBService,
    private router: Router,
    private user: UserService
  ) {
    const loggedInUser = this.user.getLoggedInUser();
    this.products = this.db.getData('products').map((prod: any) => {
      if (prod.request.find((user: any) => user.id === loggedInUser.id)) {
        return {
          ...prod,
          alreadySent: true,
          ownProduct: loggedInUser.email === prod.ownerEmail,
        };
      } else
        return {
          ...prod,
          alreadySent: false,
          ownProduct: loggedInUser.email === prod.ownerEmail,
        };
    });
    console.log(loggedInUser, this.products);
  }
  showProductDescription(id: string) {
    this.router.navigate([`/product-description/${id}`]);
  }
}
