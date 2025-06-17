import { Component } from '@angular/core';
import { ZXingScannerModule  } from '@zxing/ngx-scanner';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-busqueda-qr',
  imports: [
    ZXingScannerModule,
  ],
  templateUrl: './modal-busqueda-qr.component.html',
  styleUrl: './modal-busqueda-qr.component.css'
})
export class ModalBusquedaQrComponent {

  constructor(
    public ref: DynamicDialogRef
  ){}

  onScanSuccess(scanResult: string) {
    // console.log(parseInt(scanResult));
    this.ref.close(parseInt(scanResult));
    // this.router.navigate(['/ruta-del-sistema', scanResult]); // Redirigir con los datos del QR
  }

}
