import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { ConsumeapiService } from '../../../services/consumeapi.service'
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-modal-generar-qr',
  imports: [CommonModule],
  templateUrl: './modal-generar-qr.component.html',
  styleUrl: './modal-generar-qr.component.css'
})
export default class ModalGenerarQrComponent {
    qrImage: string | null = null;


    constructor(
      private requestService: ConsumeapiService,
      public config: DynamicDialogConfig
    ){}

    ngOnInit(){
      // console.log("axia");

      // console.log(this.config.data.folioNegocio);
      this.obtenerImagenQr();
    }

    obtenerImagenQr(){
      this.requestService.postService("generarQr", { "folio_negocio" : this.config.data.folioNegocio }).subscribe({
        next: (response: any) => {
          console.log(response.image);
          this.qrImage = response.image;
        }
      })
    }
}
