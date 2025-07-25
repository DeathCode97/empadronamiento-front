import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ConsumeapiService } from '../../services/consumeapi.service'
import { ButtonLabel, ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { DialogService} from 'primeng/dynamicdialog';
import { DynamicDialogRef} from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { MenuModule } from 'primeng/menu';
// import jwtDecode from '';

import { Router } from '@angular/router';
// import { ConfirmationService, MessageService } from 'primeng/api';
import ModalAgregarServiciosComponent from "./modal-agregar-servicios/modal-agregar-servicios.component"
import ModalDetallesNegocioComponent from "./modal-detalles-negocio/modal-detalles-negocio.component"
import ModalEditarNegocioComponent from "./modal-editar-negocio/modal-editar-negocio.component"
import ModalAgregarNegocioComponent from "./modal-agregar-negocio/modal-agregar-negocio.component"
import ModalGenerarQrComponent from "./modal-generar-qr/modal-generar-qr.component"
import ModalEditarProteccionComponent from "./modal-editar-proteccion/modal-editar-proteccion.component"

// Interfaces
import { Negocio } from "../interfaces/Negocio"

@Component({
  selector: 'app-administrador-negocios',
  imports: [
    TableModule,
    MenuModule,
    // ConsumeapiService,
    // ButtonLabel,
    ButtonModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    // BrowserModule,
    ContextMenuModule,
    ToggleSwitchModule,
    FormsModule,
    // ConfirmDialog,
    ToastModule,
    TooltipModule,
    // Message,
    ConfirmDialog,
    CommonModule
  ],
  standalone: true,
  templateUrl: './administrador-negocios.component.html',
  styleUrl: './administrador-negocios.component.css',
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
  ]
})
export default class AdministradorNegociosComponent {
  negocios: Negocio[] = [];
  opcionesNegocio: MenuItem[] | undefined;
  modalVerDetalles: DynamicDialogRef | undefined;
  modalEditarNegocio: DynamicDialogRef | undefined;
  modalAsignarServicios: DynamicDialogRef | undefined;
  modalAgregarNegocio: DynamicDialogRef | undefined;
  modalGenerarQr: DynamicDialogRef | undefined;
  moldalEditarPc: DynamicDialogRef | undefined;
  negocioSeleccionado: Negocio | undefined;
  usuarioAutenticado: boolean | undefined;
  userLogged: any = '';
  rol: any = '';


  constructor(
    private requestService: ConsumeapiService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ){}

  ngOnInit(){

    this.userLogged = localStorage.getItem('role');
    this.rol = localStorage.getItem('username');
    if(this.userLogged === 'HACIENDA'){
      this.usuarioAutenticado = true;
      this.opcionesNegocio = [
        {
          label: "Ver detalles",
          icon: "pi pi-fw pi-eye",
          command: () => this.abrirModalVerDetalles(this.negocioSeleccionado)
        },
        {
          label: "Pagar",
          icon: "pi pi-fw pi-money-bill",
          command: () => this.pagarCuotaNegocio(this.negocioSeleccionado)
        },
        {
          label: "Editar negocio",
          icon: "pi pi-fw pi-file-edit",
          command: () => this.abrirModalEditarNegocio(this.negocioSeleccionado)
        },
        {
          label: "Generar QR",
          icon: "pi pi-fw pi-qrcode",
          command: () => this.obetenerImagenQr(this.negocioSeleccionado)

        },
        {
          label: "Eliminar Negocio",
          icon: "pi pi-fw pi-trash",
          command: () => this.eliminarNegocio(this.negocioSeleccionado)
        },
      ]
    }
    else if(this.userLogged === 'PROTECCION CIVIL'){
      this.usuarioAutenticado = false;
      // if()
      if(this.rol === 'adminpc'){
        this.opcionesNegocio = [
          {
            label: "Asignar Revision de Proteccion civil",
            icon: "pi pi-fw pi-plus-circle",
            command: () => this.abrirModalAsignarServicios(this.negocioSeleccionado)
          },
          {
            label: "Editar Revision de Proteccion civil",
            icon: "pi pi-fw pi-file-edit",
            command: () => this.abrirModalEditarPc(this.negocioSeleccionado)
          },
          {
            label: "Autorizar Revision de Proteccion civil",
            icon: "pi pi-fw pi-check",
            command: () => this.autorizarRevision(this.negocioSeleccionado)
          }
        ]
      }else if(this.rol === "auxpc"){
        this.opcionesNegocio = [
          {
            label: "Asignar Revision de Proteccion civil",
            icon: "pi pi-fw pi-plus-circle",
            command: () => this.abrirModalAsignarServicios(this.negocioSeleccionado)
          },
          {
            label: "Editar Revision de Proteccion civil",
            icon: "pi pi-fw pi-file-edit",
            command: () => this.abrirModalEditarPc(this.negocioSeleccionado)
          },
        ]
      }

    }else if(this.userLogged === 'INDUSTRIA Y COMERCIO'){
      this.usuarioAutenticado = false;
       this.opcionesNegocio = [
        {
          label: "Ver detalles",
          icon: "pi pi-fw pi-eye",
          command: () => this.abrirModalVerDetalles(this.negocioSeleccionado)
        },
        {
          label: "Generar QR",
          icon: "pi pi-fw pi-qrcode",
          command: () => this.obetenerImagenQr(this.negocioSeleccionado)

        },
      ]
    }


    this.obtenerNegociosPropietarios();
    // this.validarRol();
  }

  autorizarRevision(negocio: any){
    console.log(negocio);
    // return ;
    if(negocio.revision_proteccion_civil){
      this.confirmationService.confirm({
        message: `¿Autorizar revisión de P.C. para : ${negocio.nombre_negocio}?`,
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
            label: 'Autorizar',
        },
        accept: () => {
            this.requestService.postService("autorizarRevisionPc", {idNegocio: parseInt(negocio.folio_negocio)}).subscribe({
            next: (response) => {
              if(response.status === "success"){
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Autorizado con exito' });
                this.obtenerNegociosPropietarios();
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
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se ha asignado una revisión', life: 3000 });
    }
  }

  abrirModalEditarPc(negocio: any){
    this.moldalEditarPc = this.dialogService.open(ModalEditarProteccionComponent, {
      header: `Editar revision de protección civil a : ${negocio.nombre_negocio}`,
      width: '50%',
      height: '650px',
      closable: true,
      modal: true,
      contentStyle: {"max-height": "700px", "overflow": "auto", },
      baseZIndex: 10000,
      data:{
        infoNegocio: negocio
      }
    });

    this.moldalEditarPc.onClose.subscribe((response) => {
      // console.log(response);
      if(response){
        // console.log("axia");
        // console.log(response);
        if(response.status === "success"){
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con exito' });
          this.obtenerNegociosPropietarios();
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
        }
      }else{
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Operacion Cancelada', life: 3000 });
      }
    })
  }

  pagarCuotaNegocio(negocio: any){
    // if(negocio){}
    this.confirmationService.confirm({
      message: `Generar pago para : ${negocio.nombre_negocio}?`,
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
          label: 'Pagar',
      },
      accept: () => {
          this.requestService.postService("registrarPagoNegocio", {folioNegocio: parseInt(negocio.folio_negocio)}).subscribe({
          next: (response) => {
            if(response.status === "success"){
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Pago generado con exito' });
              this.obtenerNegociosPropietarios();
            }else{
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
            }
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Operacion Cancelada', life: 3000 });
      }
    })
  }

  eliminarNegocio(negocio: any){
    console.log("axia");

    this.confirmationService.confirm({
      message: `¿Estas seguro de querer eliminar a: ${negocio.nombre_negocio}?`,
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
          label: 'Eliminar',
      },
      accept: () => {
          this.requestService.postService("eliminarNegocio", {folioNegocio: parseInt(negocio.folio_negocio)}).subscribe({
          next: (response) => {
            if(response.status === "success"){
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con exito' });
              this.obtenerNegociosPropietarios();
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

  setMenuOptionsPc(rowData: any){
    this.opcionesNegocio = [];
    console.log(rowData);

  }

  validarRol(){
    const token = localStorage.getItem('token');
    const decodedToken: any = token ? jwtDecode(token) : null;
    console.log(decodedToken?.role);

  }

  escanearNegocio(){
    this.router.navigate(['/negocioqr']);
  }

  obetenerImagenQr(negocio: any){
    this.modalGenerarQr = this.dialogService.open(ModalGenerarQrComponent, {
      header: `CODIGO QR ${negocio.nombre_negocio}`,
      width: '30%',
      height: '400px',
      closable: true,
      modal: true,
      contentStyle: {"max-height": "500px", "overflow": "auto", },
      baseZIndex: 10000,
      data:{
        folioNegocio: negocio.folio_negocio
      }
    })
  }

  insertarNegocio(){
    this.modalAgregarNegocio = this.dialogService.open(ModalAgregarNegocioComponent, {
      header: `Agregar nuevo negocio`,
      width: '60%',
      height: '500px',
      closable: true,
      modal: true,
      contentStyle: {"max-height": "700px", "overflow": "auto", },
      baseZIndex: 10000,
    });
    this.modalAgregarNegocio.onClose.subscribe((response) => {
      console.log(response);
      if(response){
        // console.log("axia");
        // console.log(response);
        if(response.status === "success"){
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con exito' });
          this.obtenerNegociosPropietarios();
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
        }
      }else{
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Operacion Cancelada', life: 3000 });
      }
    })
  }
// MODAL PARA AGREGAR LA INFORMACION DE PROTECCION CIVIL.
  abrirModalAsignarServicios(negocio: any){
    this.modalAsignarServicios = this.dialogService.open(ModalAgregarServiciosComponent, {
      header: `Asignar servicios a: ${negocio.nombre_negocio}`,
      width: '50%',
      height: '650px',
      closable: true,
      modal: true,
      contentStyle: {"max-height": "700px", "overflow": "auto", },
      baseZIndex: 10000,
      data:{
        infoNegocio: negocio
      }
    });

    this.modalAsignarServicios.onClose.subscribe((response) => {
      console.log(response);
      if(response){
        // console.log("axia");
        // console.log(response);
        if(response.status === "success"){
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con exito' });
          this.obtenerNegociosPropietarios();
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
        }
      }else{
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Operacion Cancelada', life: 3000 });
      }
    })
  }

  abrirModalVerDetalles(negocio: any){
    this.modalVerDetalles = this.dialogService.open(ModalDetallesNegocioComponent, {
      header: `Detalles del negocio: ${negocio.nombre_negocio}`,
      width: '70%',
      height: '500px',
      closable: true,
      modal: true,
      contentStyle: {"max-height": "700px", "overflow": "auto", },
      baseZIndex: 10000,
      data:{
        infoNegocio: negocio
      }
    })
  }

  abrirModalEditarNegocio(negocio: any){
    this.modalEditarNegocio = this.dialogService.open(ModalEditarNegocioComponent, {
      header: `Editar Negocio: ${negocio.nombre_negocio}`,
      width: '70%',
      height: '500px',
      closable: true,
      modal: true,
      contentStyle: {"max-height": "700px", "overflow": "auto", },
      baseZIndex: 10000,
      data:{
        infoNegocio: negocio
      }
    });

    this.modalEditarNegocio.onClose.subscribe((response) => {
      console.log(response);

      console.log("return ");
      if(response === undefined){
        // console.log("xdxd");

        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Operacion Cancelada', life: 3000 });
      }else{
        console.log(response);
        if(response.status === "success"){
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con exito' });
          this.obtenerNegociosPropietarios()
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
        }``
      }
    })
  }

  obtenerNegociosPropietarios(){
    this.requestService.postService("obtenerNegociosConPropietarios", {}).subscribe({
      next: (response) => {
        this.negocios = response.data;
        console.log(this.negocios);

      }
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getSeverity(esAmbulante: string) {
    if(esAmbulante){
      return 'info';
    }else{
      return 'danger'
    }
  }
}
