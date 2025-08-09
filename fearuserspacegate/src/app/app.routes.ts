import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { LoginHandlerComponent } from './shared/components/login-handler/login-handler.component';
import { LoginBridgeComponent } from './login-bridge/login-bridge.component';

export const routes: Routes = [
  {
    path: 'login-handler',
    component: LoginHandlerComponent
  },
  {
    path: 'login-bridge',
    component: LoginBridgeComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'bookings',
        loadChildren: () => import('./features/bookings/bookings.module').then(m => m.BookingsModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('./features/messages/messages.module').then(m => m.MessagesModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];