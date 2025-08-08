import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NegocioEventual } from "../../interfaces/negocios/NegocioEventual"
import { ConsumeapiService } from '../../services/consumeapi.service'
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { OverlayPanelModule, OverlayPanel} from 'primeng/overlaypanel';
import { PopoverModule, Popover } from 'primeng/popover';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-negocios-eventuales',
  imports: [
    TableModule,
    ButtonModule,
    ContextMenuModule,
    OverlayPanelModule,
    PopoverModule,
    ConfirmDialog,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  templateUrl: './negocios-eventuales.component.html',
  styleUrl: './negocios-eventuales.component.css'
})
export default class NegociosEventualesComponent {
  dataEventuales: NegocioEventual[] = [];
  eventualSeleccionado: NegocioEventual | undefined;
  itemsMenu: MenuItem[] | undefined;

  constructor(
    private requestService: ConsumeapiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){}

  ngOnInit(){
    this.consultarNegociosEventuales()

    this.itemsMenu = [
      {
        items: [
            {
                label: 'Eliminar',
                icon: 'pi pi-trash',
                command: () => this.eliminarNegocioEventual(this.eventualSeleccionado)

            },
            // {
            //     label: 'Export',
            //     icon: 'pi pi-upload'
            // }
        ]
      }
    ]
  }


  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getMenuItems(registro: any, popoverRef: Popover): MenuItem[] {
  return [
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => {
        popoverRef.hide();
        this.eliminarNegocioEventual(registro)
      }
    }
  ];
}

  consultarNegociosEventuales(){
    this.requestService.postService("obtenerNegociosEventuales", {}).subscribe({
      next: (response) => {
        console.log(response);

        this.dataEventuales = response.data;
      }
    })
  }

  eliminarNegocioEventual(eventual: any){
    this.confirmationService.confirm({
      message: `¿Estas seguro de querer eliminar el id: ${eventual}?`,
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
          const data = {
            id: parseInt(eventual)
          }
          this.requestService.postService("eliminarNegocioEventual", data).subscribe({
          next: (response) => {
            if(response.status === "success"){
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con exito' });
              this.consultarNegociosEventuales();
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
}
