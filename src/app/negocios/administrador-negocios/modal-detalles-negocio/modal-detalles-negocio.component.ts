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
// import { TableModule } from 'primeng/table';
// import { ConsumeapiService } from '../../../services/consumeapi.service'

@Component({
  selector: 'app-modal-detalles-negocio',
  imports: [CommonModule, TableModule, ChipModule, Tag, AccordionModule],
  templateUrl: './modal-detalles-negocio.component.html',
  styleUrl: './modal-detalles-negocio.component.css',
  standalone: true,
  providers: []
})
export default class ModalDetallesNegocioComponent {

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

  dataNegocio: ServiciosNegocio[] = [];
  // data: any;
  isAccordionLoaded: boolean = false;

  constructor(
    private requestService: ConsumeapiService,
    public config: DynamicDialogConfig
  ){}

  ngOnInit(){
    // console.log(this.data);

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
    this.consultarServicios(this.folioNegocio);
  }

  consultarServicios(idNegocio: number){
    this.requestService.postService("obtenerServiciosPorNegocio", {idPropietario: idNegocio}).subscribe({
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
