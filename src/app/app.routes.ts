import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () =>
    import('./home/home.component').then(
      (c) => c.HomeComponent
    ) },

    { path: 'watchlist', loadComponent: () =>
      import('./stock/watchlist/watchlist.component').then(
        (c) => c.WatchlistComponent
      ) },

  //   Start - User routing
  { path: 'login', loadComponent: () =>
    import('./user/login/login.component').then(
      (c) => c.LoginComponent
    )
   },
  { path: 'register', loadComponent: () =>
    import('./user/register/register.component').then(
      (c) => c.RegisterComponent
    ) },
  { path: 'profile', loadComponent: () =>
    import('./user/profile/profile.component').then(
      (c) => c.ProfileComponent
    ) },
  { path: 'logout', loadComponent: () =>
    import('./user/logout/logout.component').then(
      (c) => c.LogoutComponent
    )},

  //   End - User routing

  {
    path: 'stocks',
    children: [
      { path: '', loadComponent: () =>
        import('./home/home.component').then(
          (c) => c.HomeComponent
        ) },
      {
        path: ':stockId',
        loadComponent: () =>
          import('./stock/current-stock/current-stock.component').then(
            (c) => c.CurrentStockComponent
          )
      },
      {
        path: 'watch/:stockId',
        loadComponent: () =>
          import('./home/home.component').then(
            (c) => c.HomeComponent
          ),
        canActivate: [AuthGuard],
      }

    ],
  },
  {
    path: 'add-stock', loadComponent: () =>
      import('./stock/add-stock/add-stock.component').then(
              (c) => c.AddStockComponent
            ),
          canActivate: [AuthGuard],},




        { path: 'error', loadComponent: () =>
          import('./core/error-msg/error-msg.component').then(
            (c) => c.ErrorMsgComponent
          ) },
        { path: '404', loadComponent: () =>
          import('./error/error.component').then(
            (c) => c.PageNotFoundComponent
          ) },
        { path: '**', redirectTo: '/404' },
];
