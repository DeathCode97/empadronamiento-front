import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConsumeapiService } from '../../../services/consumeapi.service'

@Component({
  selector: 'app-modal-agregar-eventual',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './modal-agregar-eventual.component.html',
  styleUrl: './modal-agregar-eventual.component.css'
})
export class ModalAgregarEventualComponent {
  nombre_negocio: string | undefined;
  nombre_propietario: string | undefined;
  numero_propietario: string | undefined;
  ubicacion_relativa: string | undefined;
  cuota_cobrada: number | undefined;
  actividad_economica_negocio: string | undefined;

  constructor(
    private requestService: ConsumeapiService,
    public ref: DynamicDialogRef
  ){}

  ngOnInit(){

  }

  insertarNegocioEventual(){
    const data = {
      nombreNegocio: this.nombre_negocio,
      nombrePropietario: this.nombre_propietario,
      numeroPropietario: this.numero_propietario,
      ubicacionRelativa: this.ubicacion_relativa,
      cuotaCobrada: this.cuota_cobrada,
      actividadEconomicaNegocio: this.actividad_economica_negocio
    }
    console.log(data);

    this.requestService.postService("insertarNegocioEventual", data).subscribe({
      next: (response) => {
        this.ref.close(response);
        // console.log(response);
      }
    })
  }
}
