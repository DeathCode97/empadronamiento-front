import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ImageModule } from 'primeng/image';
// import { Component } from '@angular/core';
import { Image } from 'primeng/image';
// import  FooterComponent  from "./footer/footer.component"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, RouterModule, ImageModule],
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
      // {
      //   label: '<img src="../../public/img/export.png" alt="Logo" height="40">',
      //   escape: false,
      //   routerLink: "/inicio",
      // },
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
