import { Component } from '@angular/core';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
// import { Fluid } from 'primeng/fluid';
import { InputNumber } from 'primeng/inputnumber';
import { Fluid } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ConsumeapiService } from '../../../services/consumeapi.service'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-modal-editar-propietario',
  imports: [InputGroupAddonModule, InputGroupModule, FormsModule, ButtonModule, InputNumber, InputTextModule, ToastModule, SelectModule],
  templateUrl: './modal-editar-propietario.component.html',
  styleUrl: './modal-editar-propietario.component.css',
  providers: [MessageService]
})
export default class ModalEditarPropietarioComponent {
  nombre_propietario: string | undefined;
  numero_telefonico: string | undefined;
  // data: any;
  data: Object | undefined;

  constructor(
    private requestService: ConsumeapiService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ){}

  ngOnInit(){
    console.log(this.config.data?.propietarioEdit);
    this.nombre_propietario = this.config.data?.propietarioEdit.nombre_propietario;
    this.numero_telefonico = this.config.data?.propietarioEdit.numero_telefonico == null ? 'No Asignado' : this.config.data?.propietarioEdit.numero_telefonico;

  }

  actualizarPropietario(){
    // console.log( this.config.data);
    this.data = {
      nombrePropietario: this.nombre_propietario,
      numeroPropietario: this.numero_telefonico?.toString(),
      idPropietario: this.config.data?.propietarioEdit.folio_propietario
    }
    console.log(this.data);

    this.requestService.postService("editarPropietario", this.data).subscribe({
      next: (response) => {
        // console.log(response);
        this.ref.close(response);
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      }
    })
  }

  cancelar(){
    this.ref.close();
  }

}
