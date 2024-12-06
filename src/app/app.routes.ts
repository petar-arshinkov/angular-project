import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddStockComponent } from './stock/add-stock/add-stock.component';
// import { MainComponent } from './main/main.component';
// import { CurrentThemeComponent } from './theme/current-theme/current-theme.component';
// import { AuthGuard } from './guards/auth.guard';
// import { ErrorMsgComponent } from './core/error-msg/error-msg.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  //   Start - User routing
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-stock', component: AddStockComponent },
  //   End - User routing

//   // Start - Theme routing
//   {
//     path: 'themes',
//     children: [
//       { path: '', component: MainComponent },
//       {
//         path: ':themeId',
//         component: CurrentThemeComponent,
//         canActivate: [AuthGuard],
//       },
//     ],
//   },
  // {
  //   path: 'add-theme',
  //   loadComponent: () =>
  //     import('./stock/add-stock/add-stock.component').then(
  //       (c) => c.AddStockComponent
  //     ),
  //   canActivate: [AuthGuard],
  // },
//   // End - Theme routing

//   { path: 'error', component: ErrorMsgComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
