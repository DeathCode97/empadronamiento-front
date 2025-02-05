import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, RouterModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'empadronamiento-front';
  items: MenuItem[] | undefined;

  constructor(
    private router: Router
  ){}

  ngOnInit(){
    this.cargarRutas();
  }

  cargarRutas(){
    this.items = [
      {
        label: "Inicio",
        routerLink: "/inicio",
        icon: 'pi pi-home',
      },
      {
        label: "Negocios",
        items: [
          {
            label: "Administrador",
            routerLink: "/negocios/administrador"
          }
        ]
      },
      {
        label: "Propietarios",
        items: [
          {
            label: "Administrador",
            routerLink: "/propietarios/administrador"
          }
        ]
      },
      {
        label: "Servicios",
        items: [
          {
            label: "Administrador",
            routerLink: "/servicios/administrador"
          }
        ]
      },
      {
        label: "Pagos",
        items: [
          {
            label: "Administrador",
            routerLink: "/pagos/administrador"
          }
        ]
      }
    ]
  }
}
