import { Routes } from '@angular/router';
// import { AdministradorPagosComponent } from './pagos/administrador-pagos/administrador-pagos.component'

export const routes: Routes = [
    {
      path: "inicio",
      loadComponent: () => import('./menu/menu.component'),
      // children: [
      //   {
      //     path: 'negocios',
      //     title: 'Negocios',
      //     children: [
      //       {
      //         path: 'administrador',
      //         title: 'Administrador de Negocios',
      //         loadComponent: () => import('./negocios/administrador-negocios/administrador-negocios.component')
      //       }
      //     ]
      //   },
      //   {
      //     path: 'pagos',
      //     title: 'Pagos',
      //     children: [
      //       {
      //         path: 'administrador',
      //         title: 'Administrador de Pagos',
      //         loadComponent: () => import('./pagos/administrador-pagos/administrador-pagos.component')
      //       }
      //     ]
      //   },
      //   {
      //     path: 'propietarios',
      //     title: 'Propietarios',
      //     children: [
      //       {
      //         path: 'administrador',
      //         title: 'Administrador de Propietarios',
      //         loadComponent: () => import('./propietarios/administrador-propietarios/administrador-propietarios.component')
      //       }
      //     ]
      //   },
      //   {
      //     path: 'servicios',
      //     title: 'Servicios',
      //     children: [
      //       {
      //         path: 'administrador',
      //         title: 'Administrador de Servicios',
      //         loadComponent: () => import('./servicios/administrador-servicios/administrador-servicios.component')
      //       }
      //     ]
      //   }
      // ]
    },
    {
      path: "pagos",
      children: [
        {
          path: "administrador",
          loadComponent: () => import("./pagos/administrador-pagos/administrador-pagos.component")
        }
      ]
    },
    {
      path: "negocios",
      children: [
        {
          path: "administrador",
          loadComponent: () => import("./negocios/administrador-negocios/administrador-negocios.component")
        }
      ]
    },
    {
      path: "propietarios",
      children: [
        {
          path: "administrador",
          loadComponent: () => import("./propietarios/administrador-propietarios/administrador-propietarios.component")
        }
      ]
    },
    {
      path: "servicios",
      children: [
        {
          path: "administrador",
          loadComponent: () => import("./servicios/administrador-servicios/administrador-servicios.component")
        }
      ]
    },
    {
      path: "",
      redirectTo: 'inicio',
      pathMatch: 'full'
    }
];
