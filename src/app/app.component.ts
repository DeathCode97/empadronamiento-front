import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
import { Image } from 'primeng/image';
import { AuthApiService } from './services/auth-api.service'
// import  FooterComponent  from "./footer/footer.component"
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, RouterModule, ImageModule, CommonModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'empadronamiento-front';
  items: MenuItem[] | undefined;
  estaAutenticado: boolean | undefined;
  nombreUser: string | any;

  constructor(
    private router: Router,
    private authService: AuthApiService
  ){}



  ngOnInit(){
    this.cargarRutas();
    this.estaAutenticado = this.authService.isAuthenticated() ? true : false;
    this.nombreUser = localStorage.getItem('userAuth')
    console.log(this.nombreUser);
  }

  isLoginPage(): boolean{
    return this.router.url === '/login';
  }

  logout(){
    this.authService.logout();
    window.location.href = '/login';
    // this.router.navigate(['login']);
    // this.authService.logout().subscribe((response) => {
    //   console.log(response);

    //   localStorage.setItem('token', response.token);
    // });
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
            routerLink: "/servicios/administrador",
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
