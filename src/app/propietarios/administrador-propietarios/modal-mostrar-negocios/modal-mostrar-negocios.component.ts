import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ConsumeapiService } from '../../../services/consumeapi.service'
import { ListadoNegocios } from '../../interfaces/Negocios'
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { TagModule } from 'primeng/tag';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-modal-mostrar-negocios',
  imports: [TableModule, CommonModule, TagModule, Message],
  templateUrl: './modal-mostrar-negocios.component.html',
  styleUrl: './modal-mostrar-negocios.component.css'
})
export default class ModalMostrarNegociosComponent {
  listadoNegocios: ListadoNegocios[] = [];
  boolTabla: boolean = false;
  boolMensaje: boolean = false;

  constructor(
    private requestService: ConsumeapiService,
    public config: DynamicDialogConfig,
  ){}

  ngOnInit(){
    console.log(this.config.data?.propietarioId);

    this.consultarNegociosPorProp()
  }

  consultarNegociosPorProp(){
    this.requestService.postService("obtenerNegociosPorPropietario", {idPropietario: this.config.data?.propietarioId}).subscribe({
      next: (response) => {
        // console.log(response);
        if(response.data.length){
          this.listadoNegocios = response.data;
          this.boolTabla = true;
        }else{
          this.boolTabla = false;
          this.boolMensaje = this.boolMensaje = true;

        }


      }
    })
  }

  getSeverity(esAmbulante: string) {
    if(esAmbulante){
      return 'info';
    }else{
      return 'warn'
    }
  }


}
