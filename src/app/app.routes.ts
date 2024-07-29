import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductDescriptionComponent } from './pages/product-description/product-description.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
  },
  {
    path: 'product-description/:id',
    component: ProductDescriptionComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];
