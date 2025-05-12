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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { RadioButtonModule } from 'primeng/radiobutton';

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
    CommonModule,
    ToastModule,
    RadioButtonModule
  ],
  templateUrl: './modal-agregar-negocio.component.html',
  providers: [
    MessageService,
    ConfirmationService
  ],
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
  servicioPublicidadSeleccionado: Servicio | undefined;

  chkBebidas: boolean = false;
  chkPublicidad: boolean = false;

  pagoEmpadronamiento: string | undefined;
  pagoIndutriaYComercio: string | undefined;
  pagoLicenciaUsoSuelo: string | undefined;
  pagoRevisionProteccionCivil: string | undefined;
  pagoLicenciaBebidasAlc: string |undefined;
  pagoLicenciaPublicidad: string | undefined;

  //
  // proteccionCivil: any[] = [];
  // usoSuelo: any[] = [];
  // bebidas: any[] = [];



  // serviciosLicenciaUsoSuelo: Nodo
  // nuevoJson: JsonObject | undefined;
  constructor(
    private requestService: ConsumeapiService,
    private messageService: MessageService,
    public ref: DynamicDialogRef
  ){

  }

  ngOnInit(){
    this.imprimirEsAmbulante();
    this.obtenerPropietarios();
    this.obtenerActividadesEconomicas();
    this.obtenerServiciosTodos();
    // this.insertarNegocio();
  }

  // CREAMOS EL FORMULARIO
  // formulario = new FormGroup({
  //   nombreNegocio: new FormControl('', [Validators.required]), // Validación de campo obligatorio
  // });



  obtenerPropietarios(){
    this.requestService.postService("obtenerPropietarios", {}).subscribe({
      next: (response) => {
        this.listadoPropietarios = response.data;
        // console.log(this.listadoPropietarios);
      }
    })
  }

  imprimirEsAmbulante(){
    // console.log(this.esAmbulante);

  }

  insertarNegocio(){
    if(this.esAmbulante){
      const dataNegocio = {
        nombreNegocio: this.nombreNegocio,
        direccion: this.direccionNegocio,
        esAmbulante: this.esAmbulante === true ? 1 : 0,
        idPropietario: this.propietarioSeleccionado?.folio_propietario,
        actividadEconomica: this.actividadSeleccionada?.id_actividad,
        numeroTelefonicoNegocio: this.telefonoNegocio?.toString(),
        vendeAlcohol: this.chkBebidas === true ? 1 : 0,
        tienePublicidad: this.chkPublicidad === true ? 1 : 0,

      };
      console.log(dataNegocio);

      this.requestService.postService("agregarNegocio", dataNegocio).subscribe({
        next: (response) => {
          this.ref.close(response);
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      })
    }else{
      const dataNegocio = {
        nombreNegocio: this.nombreNegocio,
        direccion: this.direccionNegocio,
        esAmbulante: this.esAmbulante ? 1 : 0,
        idPropietario: this.propietarioSeleccionado?.folio_propietario,
        actividadEconomica: this.actividadSeleccionada?.id_actividad,
        numeroTelefonicoNegocio: this.telefonoNegocio?.toString(),
        vendeAlcohol: this.chkBebidas === true ? 1 : 0,
        tienePublicidad: this.chkPublicidad === true ? 1 : 0,
        servicios: [
          this.servicioLicSueloSeleccionado?.id_servicio == undefined ? 0 : this.servicioLicSueloSeleccionado?.id_servicio,
          this.servicioPcSeleccionado?.id_servicio == undefined ? 0 : this.servicioPcSeleccionado?.id_servicio,
          this.servicioBebidaSeleccionado?.id_servicio == undefined ? 0 : this.servicioBebidaSeleccionado?.id_servicio,
          this.servicioPublicidadSeleccionado?.id_servicio == undefined ? 0 : this.servicioPublicidadSeleccionado?.id_servicio
        ]
      };
      console.log(dataNegocio);

      this.requestService.postService("agregarNegocio", dataNegocio).subscribe({
        next: (response) => {
          console.log(response);
          this.ref.close(response);
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      })
    }
  }

  insertarServiciosANegocios(){
    // const dataServicios = {
    //   folioNegocio: ,
    //   idServicio:
    // };
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
