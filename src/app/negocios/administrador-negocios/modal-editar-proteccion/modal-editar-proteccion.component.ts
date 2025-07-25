import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { ConsumeapiService } from '../../../services/consumeapi.service'
import { revisionpc } from '../../../interfaces/negocios/RevisionPc';
import { StepperModule } from 'primeng/stepper';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { licencia } from '../../../interfaces/servicios/LicenciaAlcohol'
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-editar-proteccion',
  imports: [
    StepperModule,
    FieldsetModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    CommonModule,
    SelectModule,
    TextareaModule,
    MessageModule
  ],
  templateUrl: './modal-editar-proteccion.component.html',
  providers: [
    ConfirmationService,
    MessageService
  ],
  styleUrl: './modal-editar-proteccion.component.css'
})
export default class ModalEditarProteccionComponent {
  folioNegocio: number | undefined;
  revisionActiva: revisionpc[] | any;
  revisionSeleccionada: revisionpc | undefined;

  tieneRevision: boolean | undefined;
  calle_n: string | undefined;
  numero_n: number | undefined;
  colonia_n: string | undefined;
  municipio_n: string | undefined;
  metraje_frente_n: number = 0;
  metraje_largo_n: number = 0;
  metraje_total_n: number = 0;
  tipo_anuncio_n: string | undefined;
  medida_frente_anuncio_n: number = 0;
  medida_largo_anuncio_n: number = 0;
  metraje_anuncio_total_n: number = 0;
  observacion1_n: string | undefined;
  observacion2_n: string | undefined;
  fecha_de_revision_n: string | undefined;
  folio_negocio_n: number | undefined;
  revision_activa_n: boolean | undefined;
  vende_alcohol_n: boolean | undefined;
  tiene_publicidad_n: boolean | undefined;
  tipo_licencia_alcohol_n: string | undefined;
  licenciasAlcohol: licencia [] | any;
  chkBebidas: boolean = false;
  chkAnuncios: boolean = false;

  constructor(
    public config: DynamicDialogConfig,
    private requestService: ConsumeapiService,
    public ref: DynamicDialogRef
  ){}

  ngOnInit(){
    this.licenciasAlcohol = [
      {licencia: 'Abarrotes, misceláneas y tendejones con venta de cerveza en botella cerrada'},
      {licencia: 'Abarrotes, misceláneas y tendejones con venta de cerveza en botella abierta y/o bebidas alcohólicas al copeo'},
      {licencia: 'Café-bar'},
      {licencia: 'Carpa temporal para la venta de bebidas alcohólicas por día'},
      {licencia: 'Bar'},
      {licencia: 'Cantina'},
      {licencia: 'Billar'},
      {licencia: 'Baños públicos con venta de bebidas alcohólicas'},
      {licencia: 'Cervecería	'},
      {licencia: 'Clubes de servicio con restaurante bar'},
      {licencia: 'Agencia o depósito de cerveza'},
      {licencia: 'Discotecas'},
      {licencia: 'Lonchería con venta de cerveza con alimentos'},
      {licencia: 'Marisquería con venta de cervezas, vinos y licores con alimentos'},
      {licencia: 'Pizzerías'},
      {licencia: 'Pulquerías'},
      {licencia: 'Restaurante con venta de vinos y licores con alimentos'},
      {licencia: 'Restaurante con servicio de bar'},
      {licencia: 'Salón de fiestas con venta de bebidas alcohólicas'},
      {licencia: 'Supermercados con venta de cerveza, vinos y licores en botella cerrada'},
      {licencia: 'Vídeo-bar o karaoke'},
      {licencia: 'Vinatería y ultramarinos	'},
      {licencia: 'Tiendas de autoservicio con venta de bebidas alcohólicas, vinos y licores en botella cerrada'},
      {licencia: 'Peñas'},
      {licencia: 'Cualquier otro establecimiento no señalado en el que se enajenen bebidas alcohólicas'},
      {licencia: 'Cabarets o centros nocturnos'}
    ];
    this.folioNegocio = parseInt(this.config.data?.infoNegocio.folio_negocio);
    this.tieneRevision = this.config.data?.infoNegocio.revision_proteccion_civil;


    this.buscarInfoPc();
  }



  buscarInfoPc(){
    this.requestService.postService("obtenerRevisonPcPorIdNegocio", {idNegocio: this.folioNegocio}).subscribe({
      next: (response) => {
        this.revisionActiva = response.data;

        console.log(this.revisionActiva);
        this.calle_n = this.revisionActiva.calle
        this.numero_n = this.revisionActiva.numero
        this.colonia_n = this.revisionActiva.colonia
        this.municipio_n = this.revisionActiva.municipio
        this.metraje_frente_n = this.revisionActiva.metraje_frente
        this.metraje_largo_n = this.revisionActiva.metraje_largo
        this.metraje_total_n = this.revisionActiva.metraje_total
        this.tipo_anuncio_n = this.revisionActiva.tipo_anuncio
        this.medida_frente_anuncio_n = this.revisionActiva.medida_frente_anuncio
        this.medida_largo_anuncio_n = this.revisionActiva.medida_largo_anuncio
        this.metraje_anuncio_total_n = this.revisionActiva.metraje_anuncio_total
        this.observacion1_n = this.revisionActiva.observacion1
        this.observacion2_n = this.revisionActiva.observacion2
        this.fecha_de_revision_n = this.revisionActiva.fecha_de_revision
        this.folio_negocio_n = this.revisionActiva.folio_negocio
        this.revision_activa_n = this.revisionActiva.revision_activa
        this.vende_alcohol_n = this.revisionActiva.vende_alcohol
        this.tiene_publicidad_n = this.revisionActiva.tiene_publicidad
        this.tipo_licencia_alcohol_n = this.revisionActiva.tipo_licencia_alcohol

        if(this.vende_alcohol_n){
          this.chkBebidas = true;
        }
        if(this.tiene_publicidad_n){
          this.chkBebidas = true;
        }
      }
    })
  }

  actualizarRevision(){
    const data = {
      calle_pc: this.calle_n,
      numero_pc: this.numero_n,
      colonia_pc: this.colonia_n,
      municipio_pc: this.municipio_n,
      metraje_frente_pc: this.metraje_frente_n,
      metraje_largo_pc: this.metraje_largo_n,
      metraje_total_pc: this.metraje_total_n,
      tipo_anuncio_pc: this.tipo_anuncio_n,
      medida_frente_anuncio_pc: this.medida_frente_anuncio_n,
      medida_largo_anuncio_pc: this.medida_largo_anuncio_n,
      metraje_anuncio_total_pc: this.metraje_anuncio_total_n,
      observacion1_pc: this.observacion1_n,
      observacion2_pc: this.observacion2_n,
      folio_negocio_pc: this.folioNegocio,
      vende_alcohol_pc: this.vende_alcohol_n ? 1 : 0,
      tiene_publicidad_pc: this.tiene_publicidad_n ? 1 : 0,
      tipo_licencia_alcohol_pc: this.revisionSeleccionada
    }

    this.requestService.postService("actualizarRevisionPc", data).subscribe({
      next: (response) => {
        // console.log(response);
        this.ref.close(response);
      }
    })

  }

 calcularTotal(): void {
  const frente = parseFloat(this.metraje_frente_n as any) || 0;
  const largo = parseFloat(this.metraje_largo_n as any) || 0;
  this.metraje_total_n = parseFloat((frente * largo).toFixed(2));
}

calcularTotalPublicidad(): void{
  const frente = parseFloat(this.medida_frente_anuncio_n as any) || 0;
  const largo = parseFloat(this.medida_largo_anuncio_n as any) || 0;
  this.metraje_anuncio_total_n = parseFloat((frente * largo).toFixed(2));
}

  cambiarEstadoAnuncio(event: any) {
    this.chkAnuncios = event.checked;
    // console.log("Estado del checkbox:", this.chkAnuncios);
  }

  cambiarEstadoBebidas(event: any){
    this.chkBebidas = event.checked;
  }

}
