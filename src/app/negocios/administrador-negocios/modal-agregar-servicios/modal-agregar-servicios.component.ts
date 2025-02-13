import { Component } from '@angular/core';
// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumeapiService } from '../../../services/consumeapi.service'
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { Negocio } from "../../interfaces/Negocio"
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { Tag } from 'primeng/tag'
import { AccordionModule } from 'primeng/accordion';
import { ServiciosNegocio } from "../../interfaces/Servicios"
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-modal-agregar-servicios',
  imports: [CheckboxModule, CommonModule, FormsModule,ButtonModule],
  templateUrl: './modal-agregar-servicios.component.html',
  styleUrl: './modal-agregar-servicios.component.css'
})
export default class ModalAgregarServiciosComponent {
  dataServicios: ServiciosNegocio[] = [];
  folioNegocio: number | undefined;
  selectedServices: any[] = [];
  formChanged: boolean = false

  constructor(
    private requestService: ConsumeapiService,
    public config: DynamicDialogConfig
  ){}

  ngOnInit(){
    // this.consultarServicios();
    this.folioNegocio = parseInt(this.config.data?.infoNegocio.folio_negocio);
    // this.consultarServiciosPorNegocio(this.folioNegocio);
    console.log(this.folioNegocio);

    this.serviciosAsignadosDesasignados(this.folioNegocio);
  }



  serviciosAsignadosDesasignados(idNegocio: number){
    this.requestService.postService("serviciosAsignadosDesasignados", {folioNegocio: idNegocio}).subscribe({
      next: (response) => {
        console.log(response);
        if(response.status === 'success'){
          this.dataServicios = response.data;
          // console.log(this.dataNegocio.);
        }else{
        }
      }
    })
  }


  guardarServiciosSeleccionados(){
    console.log(this.selectedServices);

  }

  onFieldChange() {
    this.formChanged = true;
  }
}
