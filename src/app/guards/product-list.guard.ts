import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProductListGuard implements CanActivate {
  constructor(private router: Router, private user: UserService) {}

  canActivate(): boolean {
    if (this.user.getLoggedInUser().name) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
