import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddStockComponent } from './stock/add-stock/add-stock.component';
import { CurrentStockComponent } from './stock/current-stock/current-stock.component';
import { LogoutComponent } from './user/logout/logout.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'home',
    children: [
      {
        path: ':stockId',
        component: CurrentStockComponent,
        canActivate: [AuthGuard],
      }
    ],
  },

  //   Start - User routing
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', component: LogoutComponent },

  //   End - User routing


  // Start - Theme routing
  {
    path: 'stocks',
    children: [
      { path: '', component: HomeComponent },
      {
        path: ':stockId',
        component: CurrentStockComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'add-stock', component: AddStockComponent },
  // {
  //   path: 'add-theme',
  //   loadComponent: () =>
  //     import('./stock/add-stock/add-stock.component').then(
  //       (c) => c.AddStockComponent
  //     ),
  //   canActivate: [AuthGuard],
  // },
  // End - Theme routing

  { path: 'error', component: ErrorMsgComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
