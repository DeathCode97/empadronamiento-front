import { ListadoPropietarios } from './../interfaces/Propietarios';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
// import { ListadoPropietarios } from "../interfaces/Propietarios"
import { ConsumeapiService } from '../../services/consumeapi.service'
import { ButtonLabel, ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import ModalEditarPropietarioComponent  from "./modal-editar-propietario/modal-editar-propietario.component"
// import ModalEliminarPropietarioComponent from "./modal-eliminar-propietario/modal-eliminar-propietario.component"
import ModalMostrarNegociosComponent from "./modal-mostrar-negocios/modal-mostrar-negocios.component"
import ModalAgregarPropietarioComponent from "./modal-agregar-propietario/modal-agregar-propietario.component"
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-administrador-propietarios',
  imports: [
    TableModule,
    ButtonModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ContextMenuModule,
    ToggleSwitchModule,
    FormsModule,
    ConfirmDialog,
    ToastModule,
    TooltipModule
    // BrowserModule
  ],
  templateUrl: './administrador-propietarios.component.html',
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
  ],
  styleUrl: './administrador-propietarios.component.css'
})
export default class AdministradorPropietariosComponent {
  listadoPropietarios: ListadoPropietarios[] = [];
  opcionesPropietarios: MenuItem[] | undefined;
  propietarioSeleccionado: ListadoPropietarios | undefined;
  metaKey: boolean = true;
  propietarios: ListadoPropietarios | undefined;
  modalEditarPropietarios: DynamicDialogRef | undefined;
  modalMostrarEmpresas: DynamicDialogRef | undefined;
  // globalFilter: string;


  constructor(
    private requestService: ConsumeapiService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){}

  ngOnInit(){

    this.opcionesPropietarios = [
      {
        label: "Editar Propietario",
        icon: "pi pi-fw pi-user-edit",
        command: () => this.modalEditarPropietario(this.propietarioSeleccionado)
      },
      {
        label: "Ver negocios relacionados",
        icon: "pi pi-fw pi-building",
        command: () => this.modalMostrarNegocios(this.propietarioSeleccionado)
      },
      {
        label: "Eliminar propietario",
        icon: "pi pi-fw pi-trash",
        command: () => this.mensajeEliminarPropietario(this.propietarioSeleccionado)
      }
    ]

    this.obtenerPropietarios()

  }

  obtenerPropietarios(){
    this.requestService.postService("obtenerPropietarios", {}).subscribe({
      next: (response) => {
        this.listadoPropietarios = response.data;
        // console.log(response);
      }
    })
  }

  modalAgregarPropietario(){
    this.modalEditarPropietarios = this.dialogService.open(ModalAgregarPropietarioComponent, {
      header: `Agregar nuevo propietario`,
      width: '70%',
      height: '300px',
      closable: true,
      modal: true,
      contentStyle: {"max-height": "700px", "overflow": "auto",},
      baseZIndex: 10000,
      data:{
        // propietarioEdit: propietario
      }
    });

    this.modalEditarPropietarios.onClose.subscribe((response) => {
      console.log(response);
      if(response === undefined){
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Operacion Cancelada', life: 3000 });
      }else{
        console.log(response);
        if(response.status === "success"){
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con exito' });
          this.obtenerPropietarios()
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
        }
      }
    })

  }

  modalEditarPropietario(propietario: any){
    console.log(propietario);
    this.modalEditarPropietarios = this.dialogService.open(ModalEditarPropietarioComponent, {
        header: `Modificar propietario(a): ${propietario.nombre_propietario}`,
        width: '70%',
        height: '300px',
        closable: true,
        modal: true,
        contentStyle: {"max-height": "700px", "overflow": "auto",},
        baseZIndex: 10000,
        data:{
          propietarioEdit: propietario
        }
    });

    this.modalEditarPropietarios.onClose.subscribe((response) => {
      console.log("return ");
      if(response === undefined){
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Operacion Cancelada', life: 3000 });
      }else{
        console.log(response);
        if(response.status === "success"){
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con exito' });
          this.obtenerPropietarios()
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
        }
      }
    })

  }

  modalMostrarNegocios(propietario: any){
    console.log("negos");
    this.modalMostrarEmpresas = this.dialogService.open(ModalMostrarNegociosComponent, {
      header: `Empresas del propietario(a): ${propietario.nombre_propietario}`,
        width: '70%',
        height: '550px',
        closable: true,
        modal: true,
        contentStyle: {"max-height": "700px", "overflow": "auto",},
        baseZIndex: 10000,
        data:{
          propietarioId: propietario.folio_propietario
        }
    })

  }

  mensajeEliminarPropietario(propietario: any){
    console.log("mensaje");
    this.confirmationService.confirm({
      message: `Estas seguro de querer eliminar a: ${propietario.nombre_propietario}`,
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
        this.requestService.postService("eliminarPropietario", {idPropietario: propietario.folio_propietario}).subscribe({
          next: (response) => {
            if(response.status == "success"){
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con exito' });
              this.obtenerPropietarios()
            }else{
              this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
            }
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Operacion Cancelada', life: 3000 });
      }
    })
  }



  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  // onHide() {
  //   this.selectedId = undefined;
  // }


}
