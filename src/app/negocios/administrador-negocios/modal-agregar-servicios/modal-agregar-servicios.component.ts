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
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { StepperModule } from 'primeng/stepper';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-modal-agregar-servicios',
  imports: [
    ReactiveFormsModule,
    TextareaModule,
    CheckboxModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    FieldsetModule,
    ToastModule,
    StepperModule,
    SelectModule,
    MessageModule
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

  formulario!: FormGroup;
  dataNegocio: any | undefined;


  nombreNegocio: string | undefined = '';
  numeroPropietario: string | undefined = '';
  nombrePropietario: string | undefined = '';

  chkBebidas: boolean = false;
  chkAnuncios: boolean = false;

  tieneRevision: boolean | undefined;
  // INFORMACION DEL NEGOCIO PARA INSERTAR EN PC


  constructor(
    private requestService: ConsumeapiService,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    public ref: DynamicDialogRef
  ){}


  ngOnInit(){
    console.log( localStorage.getItem('token'));

    this.folioNegocio = parseInt(this.config.data?.infoNegocio.folio_negocio);
    this.tieneRevision = this.config.data?.infoNegocio.revision_proteccion_civil;
    console.log(this.tieneRevision);

    this.esAmbulante = this.config.data?.infoNegocio.es_ambulante;
    // this.obtenerServiciosTodos();
    this.serviciosAsignadosDesasignados(this.folioNegocio);
    this.consultarInfoNegocio();
    this.formulario = new FormGroup({
      calle: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      colonia: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      metrajeFrente: new FormControl('', [Validators.required]),
      metrajeLargo: new FormControl('', [Validators.required]),
      metrajeTotal: new FormControl('', [Validators.required]),
      tipoAnuncio: new FormControl(''),
      medidaFrenteAnuncio: new FormControl(''),
      medidaLargoAnuncio: new FormControl(''),
      metrajeAnuncioTotal: new FormControl(''),
      observacion1: new FormControl(''),
      observacion2: new FormControl(''),
      nombrePropietario: new FormControl(''),
      numeroPropietario: new FormControl(''),
      nombreNegocio: new FormControl(''),

      // nombre: new FormControl('', [Validators.required]), // Campo obligatorio
      // email: new FormControl('', [Validators.required, Validators.email]), // Email válido
      // telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]), // Teléfono de 10 dígitos
    });

  }

  cambiarEstadoAnuncio(event: any) {
    this.chkAnuncios = event.checked;
    // console.log("Estado del checkbox:", this.chkAnuncios);
  }

  cambiarEstadoBebidas(event: any){
    this.chkBebidas = event.checked;
  }

  convertirMayusculas(control: string){
    let valor = this.formulario.get(control)?.value.toUpperCase();
    this.formulario.get(control)?.setValue(valor, { emitEvent: false });

  }

  consultarInfoNegocio(){
    this.requestService.postService("obtenerNegocioPropietario", {folioNegocio: this.folioNegocio}).subscribe({
      next: (response) => {
        console.log(response.data);
        response.data.forEach(element => {
          this.dataNegocio = element;
        });
         this.nombreNegocio = this.dataNegocio.nombre_negocio;
         this.numeroPropietario = this.dataNegocio.numero_telefonico;
         this.nombrePropietario = this.dataNegocio.nombre_propietario;
        console.log(this.dataNegocio.nombre_negocio);

      }
    })

  }

  insertarRevisionDePc(){

    // console.log(this.formulario.value);
    let jsonActualizado = {...this.formulario.value, idNegocio: this.folioNegocio}
    console.log(jsonActualizado);


    if (this.formulario.valid) {
      // console.log("Datos enviados:", this.formulario.value);
      this.requestService.postService("insertarRevisionPc", jsonActualizado).subscribe({
      next: (response) => {
        console.log(response);
        this.ref.close(response);
      }
    })


    } else {
      // console.log("Formulario inválido. Revisa los campos.");
    }

    // this.requestService.postService("insertarRevisionPc", {}).subscribe({
    //   next: (response) => {
    //     // this.negocios = response.data;
    //     // console.log(this.negocios);
    //   }
    // })

  }


  serviciosAsignadosDesasignados(idNegocio: number){
    console.log("acia agregar");
    console.log(idNegocio);

    // this.requestService.postService("obtenerServiciosPorNegocio", {folioNegocio: idNegocio}).subscribe({
    //   next: (response) => {
    //     // console.log(response);
    //     if(response.status === 'success'){
    //       // console.log(response);
    //       this.dataServicios = response.data;
    //       this.dataServicios.forEach(element => {
    //         switch(element.nombre_categoria){
    //           case "LICENCIA DE USO DE SUELO":
    //             this.opcionUsoDeSuelo = element.nombre_servicio;
    //             break;
    //           case "REVISION DE PROTECCION CIVIL":
    //             this.opcionProteccionCivil = element.nombre_servicio;
    //             break;
    //           case "LICENCIA DE BEBIDAS ALCOHOLICAS":
    //             this.opcionBebidasAlcoholicas = element.nombre_servicio;
    //             break;
    //           case "LICENCIA DE PUBLICIDAD":
    //             this.opcionLicenciaPublicidad = element.nombre_servicio;
    //             break;
    //         }
    //       });
    //     }else{

    //     }
    //   }
    // })
  }

  actualizarServicios(){

  }

  // obtenerServiciosTodos(){
  //   this.requestService.postService("obtenerServiciosTodos", {}).subscribe({
  //     next: (response: any) => {
  //       // console.log(response.data.BEBIDAS);
  //       this.serviciosPc = response.data.PROTECCION_CIVIL;
  //       this.serviciosLicSuelo = response.data.USO_SUELO;
  //       this.serviciosBebidas = response.data.BEBIDAS;
  //     }
  //   })
  // }


  guardarServiciosSeleccionados(){
    console.log(this.selectedServices);

  }

  onFieldChange() {
    this.formChanged = true;
  }
}
