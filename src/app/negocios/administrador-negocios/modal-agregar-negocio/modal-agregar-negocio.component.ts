import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ListadoPropietarios } from '../../../propietarios/interfaces/Propietarios';
import { ActividadEconomica } from "../../../interfaces/ActividadEconmica"
import { Checkbox } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { ConsumeapiService } from '../../../services/consumeapi.service'
import { TreeTableModule } from 'primeng/treetable';
import { Nodo } from '../../../interfaces/negocios/Nodo'
import { Servicio, ApiResponse } from '../../../interfaces/servicios/Servicio'
import { FieldsetModule } from 'primeng/fieldset';
import { elementAt } from 'rxjs';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-modal-agregar-negocio',
  imports: [
    StepperModule,
    ButtonModule,
    InputIconModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    FormsModule,
    InputNumber,
    Checkbox,
    SelectModule,
    TreeTableModule,
    FieldsetModule,
    CheckboxModule,
    CommonModule
  ],
  templateUrl: './modal-agregar-negocio.component.html',
  styleUrl: './modal-agregar-negocio.component.css'
})
export default class ModalAgregarNegocioComponent {
  nombreNegocio: string | undefined;
  direccionNegocio: string | undefined;
  esAmbulante: boolean | undefined;
  listadoPropietarios: ListadoPropietarios[] = [];
  propietarioSeleccionado: ListadoPropietarios | undefined;
  actividadesEconomicas: ActividadEconomica[] = [];
  actividadSeleccionada: ActividadEconomica | undefined;
  telefonoNegocio: string | undefined;
  formChanged: boolean = false;
  jsonEntidades: any;

  serviciosPc: Servicio[] = [];
  serviciosLicSuelo: Servicio[] = [];
  serviciosBebidas: Servicio[] = [];
  apiResp: ApiResponse[] = [];

  servicioPcSeleccionado: Servicio | undefined;
  servicioLicSueloSeleccionado: Servicio | undefined;
  servicioBebidaSeleccionado: Servicio | undefined;

  chkBebidas: boolean = false;
  chkPublicidad: boolean = false;

  //
  // proteccionCivil: any[] = [];
  // usoSuelo: any[] = [];
  // bebidas: any[] = [];



  // serviciosLicenciaUsoSuelo: Nodo
  // nuevoJson: JsonObject | undefined;
  constructor(
    private requestService: ConsumeapiService
  ){

  }

  ngOnInit(){
    this.imprimirEsAmbulante();
    this.obtenerPropietarios();
    this.obtenerActividadesEconomicas();
    this.obtenerServiciosTodos();
  }

  obtenerPropietarios(){
    this.requestService.postService("obtenerPropietarios", {}).subscribe({
      next: (response) => {
        this.listadoPropietarios = response.data;
        // console.log(this.listadoPropietarios);
      }
    })
  }

  imprimirEsAmbulante(){
    console.log(this.esAmbulante);

  }

  obtenerServiciosTodos(){
    this.requestService.postService("obtenerServiciosTodos", {}).subscribe({
      next: (response: any) => {
        // console.log(response.data.BEBIDAS);
        this.serviciosPc = response.data.PROTECCION_CIVIL;
        this.serviciosLicSuelo = response.data.USO_SUELO;
        this.serviciosBebidas = response.data.BEBIDAS;
        // console.log(this.serviciosPc);
        // console.log(this.serviciosLicSuelo);
        // console.log(this.serviciosBebidas);
        // this.apiResp = response.data;
        // console.log(this.apiResp);
      }
    })
  }

  obtenerActividadesEconomicas(){
    this.requestService.postService("obtenerActividadesEconomicas", {}).subscribe({
      next: (response) => {
        this.actividadesEconomicas = response.data;
        // console.log(this.actividadesEconomicas);

      }
    })
  }



  onFieldChange() {
    this.formChanged = true;

  }


}
