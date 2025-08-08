import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet,Event, NavigationStart, NavigationEnd  } from '@angular/router';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
import { Image } from 'primeng/image';
import { AuthApiService } from './services/auth-api.service'
// import  FooterComponent  from "./footer/footer.component"
import { ButtonModule } from 'primeng/button';
import { ConsumeapiService } from './services/consumeapi.service'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { WebSocketService } from './services/web-socket.service';
import { notificacionText } from './interfaces/notificaciones/notificacion'
import { LoadingService } from './services/loading.service'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, RouterModule, ImageModule, CommonModule, ButtonModule,ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `
    <app-loading></app-loading>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  // title = 'empadronamiento-front';
  items: MenuItem[] | undefined;
  estaAutenticado: boolean | undefined;
  nombreUser: string | any;
  userLogged: any;

  notificaciones: notificacionText[] = [];

  constructor(
    private router: Router,
    private authService: AuthApiService,
    private requestService: ConsumeapiService,
    private wsService: WebSocketService,
    private messageService: MessageService,
    private loadingService: LoadingService
  ){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (event instanceof NavigationEnd) {
        this.loadingService.hide();
      }
    });

  }



  ngOnInit(){
    // this.wsService.getMessages().subscribe(data => {
    //   console.log(data);

    //   this.messageService.add({ severity: 'success', summary: 'Nuevo dato', detail: `Se insertó:` });
    // });
    this.nombreUser = localStorage.getItem('username');
    this.userLogged = localStorage.getItem('role');
    // console.log(this.userLogged);

    this.consultarNotificacionesPorPerfil();
    // console.log(localStorage.getItem('userAuth'));


    this.wsService.onNewRecord().subscribe(data => {
      // console.log(data.para);

       if(data.para === this.userLogged){
        // console.log(data.newData);
        // this.consultarNotificacionesPorPerfil();
        this.messageService.add({ severity: 'success', summary: 'Nuevo dato', detail: `Se insertó: ${data.newData}` });
        this.consultarNotificacionesPorPerfil();
        this.cargarRutas();
      }
    })


    this.cargarRutas();
    this.estaAutenticado = this.authService.isAuthenticated();

    // console.log(this.nombreUser);
  }

  isLoginPage(): boolean{
    return this.router.url === '/login';
  }

  consultarNotificacionesPorPerfil(){
    // console.log(this.userLogged);

    const data = {
      usuario: this.userLogged === 'HACIENDA' ? 'HACIENDA' : 'PC'
    }
    // console.log(data);

    this.requestService.postService("consultarNotificacionesPorUsuario", data).subscribe({
      next: (response) => {
        // console.log(response)
        this.notificaciones = response.data;
        this.cargarRutas();
      }
    })
  }

  logout(){
    this.authService.logout();
    window.location.href = '/login';
    this.requestService.postService("logout", {}).subscribe({
      next: (response) => {
        // console.log(response);

      }
    });
    // console.log();

    // this.router.navigate(['login']);
    // this.authService.logout().subscribe((response) => {
    //   console.log(response);

    //   localStorage.setItem('token', response.token);
    // });
  }

  cargarRutas(){
    if(this.estaAutenticado){
      switch (this.userLogged) {
        case "HACIENDA":
          this.items = [
            {
              label: "Inicio",
              routerLink: "/inicio",
              icon: 'pi pi-home',
              badge: this.notificaciones.length.toString()
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
            // {
            //   label: "",
            //   badge: this.notificaciones.length.toString(),
            //   icon: "pi pi-bell",
            //   items: this.notificaciones.map(n => ({ label: n.label }))
            // }
          ];
          break;
        case "PROTECCION CIVIL":
          this.items = [
            {
              label: "Inicio",
              routerLink: "/inicio",
              icon: 'pi pi-home',
              badge: this.notificaciones.length.toString()
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
          ];
          break;
        case "INSPECCION":
          this.items = [
            {
              label: "Inicio",
              routerLink: "/inicio",
              icon: 'pi pi-home',
            },
            {
              label: "Escaner QR",
              routerLink: "/negocioqr",
            },
            {
              label: "Negocios Eventuales",
              routerLink: "/negocioeventual"
            }
          ];
          break;
        case "INDUSTRIA Y COMERCIO":
           this.items = [
            {
              label: "Inicio",
              routerLink: "/inicio",
              icon: 'pi pi-home',
              badge: this.notificaciones.length.toString()
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
          ];
          break
      }
    }

  }
}
