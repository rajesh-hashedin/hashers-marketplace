import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductDescriptionComponent } from './pages/product-description/product-description.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductListGuard } from './guards/product-list.guard';
import { LoginRegisterGuard } from './guards/login-register.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRegisterGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginRegisterGuard],
  },
  {
    path: '',
    component: ProductListComponent,
    canActivate: [ProductListGuard],
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
    canActivate: [ProductListGuard],
  },
  {
    path: 'product-description/:id',
    component: ProductDescriptionComponent,
    canActivate: [ProductListGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProductListGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
