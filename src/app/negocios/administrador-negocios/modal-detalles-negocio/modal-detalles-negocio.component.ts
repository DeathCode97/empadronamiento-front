import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumeapiService } from '../../../services/consumeapi.service'
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { Negocio } from "../../interfaces/Negocio"
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { Tag } from 'primeng/tag'
import { AccordionModule } from 'primeng/accordion';
import { ServiciosNegocio } from "../../interfaces/Servicios"
import { CardModule } from 'primeng/card';
import { Rpc } from '../../interfaces/Rpc'

import { MessageModule } from 'primeng/message';

// import { TableModule } from 'primeng/table';
// import { ConsumeapiService } from '../../../services/consumeapi.service'

@Component({
  selector: 'app-modal-detalles-negocio',
  imports: [CommonModule, TableModule, ChipModule, Tag, AccordionModule, CardModule, MessageModule],
  templateUrl: './modal-detalles-negocio.component.html',
  styleUrl: './modal-detalles-negocio.component.css',
  standalone: true,
  providers: []
})
export default class ModalDetallesNegocioComponent {

  revisionProteccionCivil: any;
// negocio = {
//     nombre: "Papelería JDH SA de CV",
//     direccion: "5 SUR, CENTRO, ZARAGOZA",
//     numero: "9",
//     propietario: "Daniela Martínez Pérez"
//   };



  data: any;
  datosNegocio: any;
  // folio: String | undefined;
  direccion: string | undefined;
  esAmbulante: boolean | undefined;
  fechaRegistro: string | undefined;
  folioNegocio: number | undefined;
  actividadEconomica: string | undefined;
  giro: string | undefined;
  nombreNegocio: string | undefined;
  nombrePropietario: string | undefined;
  numeroTelefonicoNegocio: string | undefined;
  numeroTelefonicoPropietario: string | undefined;
  activeIndex: number | null = null;

  // datos pc
  direccionRevision: string | undefined;

  metrajeFrente: number | undefined;
  metrajeLargo: number | undefined;
  metrajeTotal: number | undefined;
  tipoAnuncio: string | undefined;
  metrajeAnuncioFrente: number | undefined
  metrajeAnuncioLargo: number | undefined;
  metrajeAnuncioTotal: number | undefined;
  observacion1: string | undefined;
  observacion2: string | undefined;
  fechaRevisionPc: string | undefined;
  estatusDePago: boolean | undefined;
  fechaPago: string | undefined;
  tipoPagoAmbulante: string | undefined;
  dataNegocio: ServiciosNegocio[] = [];
  revisionAutorizada: boolean | undefined;
  // data: any;
  isAccordionLoaded: boolean = false;

  constructor(
    private requestService: ConsumeapiService,
    public config: DynamicDialogConfig
  ){}

  ngOnInit(){
    console.log(this.config.data);

    this.direccion = this.config.data?.infoNegocio.direccion;
    this.esAmbulante = this.config.data?.infoNegocio.es_ambulante;
    this.fechaRegistro = this.config.data?.infoNegocio.fecha_registro;
    this.folioNegocio = parseInt(this.config.data?.infoNegocio.folio_negocio);
    this.actividadEconomica = this.config.data?.infoNegocio.nombre_actividad;
    this.giro = this.config.data?.infoNegocio.nombre_giro;
    this.nombreNegocio = this.config.data?.infoNegocio.nombre_negocio;
    this.nombrePropietario = this.config.data?.infoNegocio.nombre_propietario
    this.numeroTelefonicoNegocio = this.config.data?.infoNegocio.numero_telefonico_negocio
    this.numeroTelefonicoPropietario = this.config.data?.infoNegocio.numero_telefonico_propietario
    this.esAmbulante = this.config.data?.infoNegocio.es_ambulante;
    this.estatusDePago = this.config.data?.infoNegocio.estatus_pago_servicios;
    this.fechaPago = this.config.data?.infoNegocio.fecha_pago_servicios;
    this.tipoPagoAmbulante = this.config.data?.infoNegocio.tipo_pago;
    this.revisionAutorizada = this.config.data?.infoNegocio.revision_pc_autorizada;
    console.log(this.revisionAutorizada);

    // this.consultarServicios(this.folioNegocio);
    this.consultarRevisionPc(this.folioNegocio);

  }

  consultarRevisionPc(idNegocio: number){
    this.requestService.postService("obtenerRevisonPcPorIdNegocio", {idNegocio: idNegocio}).subscribe({
      next: (response) => {
        // console.log(response);
        this.revisionProteccionCivil = response.data;
        console.log(this.revisionProteccionCivil.numero);

        // console.log(this.revisionProteccionCivil.numero);
        this.direccionRevision = this.revisionProteccionCivil.calle + ' ' + this.revisionProteccionCivil.numero + ' ' + this.revisionProteccionCivil.colonia + ' ' + this.revisionProteccionCivil.municipio
        this.metrajeFrente = this.revisionProteccionCivil.metraje_frente
        this.metrajeLargo = this.revisionProteccionCivil.metraje_largo
        this.metrajeTotal = this.revisionProteccionCivil.metraje_total
        this.tipoAnuncio = this.revisionProteccionCivil.tipo_anuncio
        this.metrajeAnuncioFrente = this.revisionProteccionCivil.medida_frente_anuncio
        this.metrajeAnuncioLargo = this.revisionProteccionCivil.medida_largo_anuncio
        this.metrajeAnuncioTotal = this.revisionProteccionCivil.metraje_anuncio_total
        this.observacion1 = this.revisionProteccionCivil.observacion1
        this.observacion2 = this.revisionProteccionCivil.observacion2
        this.fechaRevisionPc = this.revisionProteccionCivil.fecha_de_revision
      }
    })
  }

  consultarServicios(idNegocio: number){
    this.requestService.postService("obtenerServiciosPorNegocio", {folioNegocio: idNegocio}).subscribe({
      next: (response) => {
        console.log(response);
        if(response.status === 'success'){
          this.dataNegocio = response.data;
        }else{

        }
      }
    })
  }

}
