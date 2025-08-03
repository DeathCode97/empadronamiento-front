import { notificacion } from './../interfaces/notificaciones/notificacion';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { AuthApiService } from "../services/auth-api.service";
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { WebSocketService } from '../services/web-socket.service';
import { ButtonLabel, ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
// import { notificacion } from '../interfaces/notificaciones/notificacion'
import { ConsumeapiService } from '../services/consumeapi.service'
@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    TagModule,
    ButtonModule,
    ConfirmDialog,
    ToastModule,
    TooltipModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export default class MenuComponent {
  title = 'Bienvenido al Sistema de Empadronamiento';
  description = 'Aquí puedes gestionar todos los registros de manera eficiente y segura.';
  nombreUser: string | any;
  userLogged: any;
  notificaciones: notificacion[] = [];

  constructor(
    private authService: AuthApiService,
    private requestService: ConsumeapiService,
    private wsService: WebSocketService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ){}

  ngOnInit(){
    this.nombreUser = localStorage.getItem('username');
    this.userLogged = localStorage.getItem('role');
    this.consultarNotificacionesPorPerfil();
    this.wsService.onNewRecord().subscribe(data => {
      // console.log(data.para);

       if(data.para === this.userLogged){
        // console.log(data.newData);
        // this.consultarNotificacionesPorPerfil();
        // this.messageService.add({ severity: 'success', summary: 'Nuevo dato', detail: `Se insertó: ${data.newData}` });
        this.consultarNotificacionesPorPerfil();
        // this.cargarRutas();
      }
    })
  }

  marcarComoVistoNotif(folioNotif: number){
    // console.log(folioNotif);

    this.confirmationService.confirm({
        message: `¿Marcar como visto el folio ${folioNotif}?`,
        header: 'Confirmación',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Visto',
        },
        accept: () => {
            this.requestService.postService("vistearNorificacion", {folioNotificacion: folioNotif}).subscribe({
            next: (response) => {
              if(response.status === "success"){
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Autorizado con exito' });
                this.consultarNotificacionesPorPerfil();
              }else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
              }
            }
          });
        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Operacion Cancelada', life: 3000 });
        }
      });
  }

  consultarNotificacionesPorPerfil(){
    console.log(this.userLogged);
    console.log(this.nombreUser);

    const data = {
      usuario: this.userLogged === 'HACIENDA' ? 'HACIENDA' : 'PC'
    }
    // console.log(data);

    this.requestService.postService("consultarNotificacionesPorUsuario", data).subscribe({
      next: (response) => {
        // console.log(response)
        this.notificaciones = response.data;
        // this.cargarRutas();
      }
    })
  }


}
