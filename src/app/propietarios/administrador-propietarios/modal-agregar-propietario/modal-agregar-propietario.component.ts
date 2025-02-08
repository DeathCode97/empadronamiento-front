import { Component } from '@angular/core';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
// import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
// import { Fluid } from 'primeng/fluid';
import { InputNumber } from 'primeng/inputnumber';
import { Fluid } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ConsumeapiService } from '../../../services/consumeapi.service'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-agregar-propietario',
  imports: [InputGroupAddonModule, InputGroupModule, FormsModule, ButtonModule, InputNumber, InputTextModule, ToastModule],
  templateUrl: './modal-agregar-propietario.component.html',
  styleUrl: './modal-agregar-propietario.component.css'
})
export default class ModalAgregarPropietarioComponent {

  nombrePropietario: string | undefined;
  numeroPropietario: number | undefined;
  data: Object | undefined;

  constructor(
    private requestService: ConsumeapiService,
    public ref: DynamicDialogRef
  ){}

  insertarPropietario(){
    this.data = {
      "nombre": this.nombrePropietario,
      "numeroPropietario": this.numeroPropietario?.toString()
    }

    this.requestService.postService("insertarPropietarios", this.data).subscribe({
      next: (response) => {
        console.log();
        this.ref.close(response);
      }
    })
  }

  cancelar(){
    this.ref.close();
  }

}
