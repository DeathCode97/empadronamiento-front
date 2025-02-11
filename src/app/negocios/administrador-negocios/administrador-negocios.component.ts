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
import ModalAgregarServiciosComponent from "./modal-agregar-servicios/modal-agregar-servicios.component"
import ModalDetallesNegocioComponent from "./modal-detalles-negocio/modal-detalles-negocio.component"
import ModalEditarNegocioComponent from "./modal-editar-negocio/modal-editar-negocio.component"

// Interfaces
import { Negocio } from "../interfaces/Negocio"

@Component({
  selector: 'app-administrador-negocios',
  imports: [
    TableModule,
    // ConsumeapiService,
    // ButtonLabel,
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
    // Message
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
  negocioSeleccionado: Negocio | undefined;

  constructor(
    private requestService: ConsumeapiService,
    public dialogService: DialogService
  ){}

  ngOnInit(){

    this.opcionesNegocio = [
      {
        label: "Ver detalles",
        icon: "pi pi-fw pi-eye",
        command: () => this.abrirModalVerDetalles(this.negocioSeleccionado)
      },
      {
        label: "Editar negocio",
        icon: "pi pi-fw pi-file-edit",
        command: () => this.abrirModalEditarNegocio(this.negocioSeleccionado)
      },{
        label: "Asignar servicios",
        icon: "pi pi-fw pi-plus-circle",
        command: () => console.log("")
      },
      {
        label: "Eliminar Negocio",
        icon: "pi pi-fw pi-trash",
        command: () => console.log("")
      }
    ]

    this.obtenerNegociosPropietarios()
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
      return 'warn'
    }
  }
}
