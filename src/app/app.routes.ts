import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
// import { AdministradorPagosComponent } from './pagos/administrador-pagos/administrador-pagos.component'

export const routes: Routes = [
    {
      path: "login",
      loadComponent: () => import('./auth_controls/login/login.component')
    },
    {
      path: "inicio",
      loadComponent: () => import('./menu/menu.component'),
      canActivate: [authGuard]
    },
    {
      path: "pagos",
      // canActivate: [authGuard],
      children: [
        {
          path: "administrador",
          loadComponent: () => import("./pagos/administrador-pagos/administrador-pagos.component"),
          canActivate: [authGuard]
        }
      ]
    },
    {
      path: "negocios",
      children: [
        {
          path: "administrador",
          loadComponent: () => import("./negocios/administrador-negocios/administrador-negocios.component"),
          canActivate: [authGuard]
        }
      ]
    },
    {
      path: "propietarios",
      children: [
        {
          path: "administrador",
          loadComponent: () => import("./propietarios/administrador-propietarios/administrador-propietarios.component"),
          canActivate: [authGuard]
        }
      ]
    },
    {
      path: "servicios",
      children: [
        {
          path: "administrador",
          loadComponent: () => import("./servicios/administrador-servicios/administrador-servicios.component"),
          canActivate: [authGuard]
        }
      ]
    },
    {
      path: "",
      redirectTo: 'inicio',
      pathMatch: 'full',
      // canActivate: [authGuard]
    }
];
