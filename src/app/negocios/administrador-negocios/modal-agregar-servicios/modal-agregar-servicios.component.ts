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
import { Servicio, ApiResponse } from '../../../interfaces/servicios/Servicio'
import { FieldsetModule } from 'primeng/fieldset';
import { elementAt } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { StepperModule } from 'primeng/stepper';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-modal-agregar-servicios',
  imports: [
    CheckboxModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    FieldsetModule,
    ToastModule,
    StepperModule,
    SelectModule
  ],
  templateUrl: './modal-agregar-servicios.component.html',
  providers: [
    ConfirmationService,
    MessageService
  ],
  styleUrl: './modal-agregar-servicios.component.css'
})
export default class ModalAgregarServiciosComponent {
  dataServicios: ServiciosNegocio[] = [];
  folioNegocio: number | undefined;
  selectedServices: any[] = [];
  formChanged: boolean = false;
  esAmbulante: boolean | undefined;
  serviciosPc: Servicio[] = [];
  serviciosLicSuelo: Servicio[] = [];
  serviciosBebidas: Servicio[] = [];

  servicioPcSeleccionado: Servicio | undefined;
  servicioLicSueloSeleccionado: Servicio | undefined;
  servicioBebidaSeleccionado: Servicio | undefined;
  servicioPublicidadSeleccionado: Servicio | undefined;

  opcionProteccionCivil: string | undefined;
  opcionUsoDeSuelo: string | undefined;
  opcionBebidasAlcoholicas: string | undefined;
  opcionLicenciaPublicidad: string | undefined;


  chkBebidas: boolean = false;
  chkPublicidad: boolean = false;
  constructor(
    private requestService: ConsumeapiService,
    public config: DynamicDialogConfig
  ){}

  ngOnInit(){
    this.folioNegocio = parseInt(this.config.data?.infoNegocio.folio_negocio);
    this.esAmbulante = this.config.data?.infoNegocio.es_ambulante;
    this.obtenerServiciosTodos();
    this.serviciosAsignadosDesasignados(this.folioNegocio);
  }



  serviciosAsignadosDesasignados(idNegocio: number){
    console.log("acia agregar");
    console.log(idNegocio);

    this.requestService.postService("obtenerServiciosPorNegocio", {folioNegocio: idNegocio}).subscribe({
      next: (response) => {
        // console.log(response);
        if(response.status === 'success'){
          // console.log(response);
          this.dataServicios = response.data;
          this.dataServicios.forEach(element => {
            switch(element.nombre_categoria){
              case "LICENCIA DE USO DE SUELO":
                this.opcionUsoDeSuelo = element.nombre_servicio;
                break;
              case "REVISION DE PROTECCION CIVIL":
                this.opcionProteccionCivil = element.nombre_servicio;
                break;
              case "LICENCIA DE BEBIDAS ALCOHOLICAS":
                this.opcionBebidasAlcoholicas = element.nombre_servicio;
                break;
              case "LICENCIA DE PUBLICIDAD":
                this.opcionLicenciaPublicidad = element.nombre_servicio;
                break;
            }
          });
        }else{

        }
      }
    })
  }

  actualizarServicios(){}

  obtenerServiciosTodos(){
    this.requestService.postService("obtenerServiciosTodos", {}).subscribe({
      next: (response: any) => {
        // console.log(response.data.BEBIDAS);
        this.serviciosPc = response.data.PROTECCION_CIVIL;
        this.serviciosLicSuelo = response.data.USO_SUELO;
        this.serviciosBebidas = response.data.BEBIDAS;
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
