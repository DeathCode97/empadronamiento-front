import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { ZXingScannerModule  } from '@zxing/ngx-scanner';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonLabel, ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { DialogService} from 'primeng/dynamicdialog';
import { ConsumeapiService } from '../../../services/consumeapi.service';
import { DynamicDialogRef} from 'primeng/dynamicdialog';
import { NegocioQR } from "../../../interfaces/negocios/NegocioQR";
import { CommonModule } from '@angular/common';
import { ModalBusquedaQrComponent } from '../modal-busqueda-qr/modal-busqueda-qr.component'
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-informacion-negocio-qr',
  imports: [
    ZXingScannerModule,
    DividerModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    FormsModule,
    CommonModule,
    InputNumber
  ],
  providers: [
        DialogService,
  ],
  templateUrl: './informacion-negocio-qr.component.html',
  styleUrl: './informacion-negocio-qr.component.css'
})
export default class InformacionNegocioQrComponent {

  searchTerm: number | undefined;
  modalBuscarQr: DynamicDialogRef | undefined;
  informacionNegocio: NegocioQR[] | undefined;
  esAmbulante: boolean | undefined;
  mostrarContenido: boolean = false;
  folioNegocio: number | undefined;
  nombreNegocio: string | undefined
  direccion: string | undefined;
  numeroTelefonicoNegocio: number | undefined;
  fechaRegistro: string | undefined;
  tipoPago: string | undefined;
  cuotaAmbulantaje: number | undefined;
  revisionProteccion_civil: boolean | undefined;
  esNegocioNuevo: boolean | undefined;
  fechaPagoServicios: string | undefined;
  nombrePropietario: string | undefined;
  numeroTelefonico: number | undefined;
  nombreActividad: string | undefined;
  nombreGiro: string | undefined;


  constructor(
    public dialogService: DialogService,
    private requestService: ConsumeapiService,
    // public ref: DynamicDialogRef
  ){}

  ngInit(){
    // this.router.navigate(['/negocioqr']);
  }

  abrirEscannerQr(){
    this.modalBuscarQr = this.dialogService.open(ModalBusquedaQrComponent, {
      header: `Escanea un codigo qr valido.`,
      width: '30%',
      height: '400px',
      closable: true,
      modal: true,
      contentStyle: {"max-height": "500px", "overflow": "auto", },
      baseZIndex: 10000,
    })

    this.modalBuscarQr.onClose.subscribe((response) => {
      console.log(response);

      this.obtenerInfoNegocioQr(response);
    })
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  buscar(){
    // console.log("Xdxdx");
    if(this.searchTerm){
      console.log("esta");
    }else{
      console.log("nosta");
      document.getElementsByName('folioxd');
    }
  }

  validateInput(inputRef: any) {
    if (!this.searchTerm) {
      // alert('El folio del negocio es un campo obligatorio.');
      // inputRef.focus(); // Enfoca el campo nuevamente
    }
  }


  obtenerInfoNegocioQr(idNego: number){
    this.requestService.postService("obtenerInformacionNegocioQR", {folioNegocio: idNego}).subscribe({
      next: (response) => {
        this.informacionNegocio = response.data;
        // this.negocios = response.data;
        console.log(this.informacionNegocio[0]);

        this.esAmbulante = this.informacionNegocio[0].es_ambulante;
        this.folioNegocio = this.informacionNegocio[0].folio_negocio;
        this.nombreNegocio = this.informacionNegocio[0].nombre_negocio;
        this.direccion = this.informacionNegocio[0].direccion;
        this.numeroTelefonicoNegocio = this.informacionNegocio[0].numero_telefonico_negocio;
        this.fechaRegistro = this.informacionNegocio[0].fecha_registro;
        this.tipoPago = this.informacionNegocio[0].tipo_pago;
        this.cuotaAmbulantaje = this.informacionNegocio[0].cuota_ambulantaje;
        this.revisionProteccion_civil = this.informacionNegocio[0].revision_proteccion_civil;
        this.esNegocioNuevo = this.informacionNegocio[0].es_negocio_nuevo;
        this.fechaPagoServicios = this.informacionNegocio[0].fecha_pago_servicios;
        this.nombrePropietario = this.informacionNegocio[0].nombre_propietario;
        this.numeroTelefonico = this.informacionNegocio[0].numero_telefonico;
        this.nombreActividad = this.informacionNegocio[0].nombre_actividad
        this.nombreGiro = this.informacionNegocio[0].nombre_giro;
        this.mostrarContenido = true;
      }
    })
  }
}
