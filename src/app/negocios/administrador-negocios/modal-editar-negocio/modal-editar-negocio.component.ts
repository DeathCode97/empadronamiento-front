import { Component } from '@angular/core';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FormsModule } from '@angular/forms';
import { ConsumeapiService } from '../../../services/consumeapi.service'
import { ListadoPropietarios } from '../../../propietarios/interfaces/Propietarios';
import { InputNumber } from 'primeng/inputnumber';
import { Checkbox } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { ActividadEconomica } from "../../../interfaces/ActividadEconmica"

@Component({
  selector: 'app-modal-editar-negocio',
  imports: [InputIconModule, InputTextModule, InputGroupAddonModule, InputGroupModule, FormsModule, InputNumber, Checkbox, SelectModule],
  templateUrl: './modal-editar-negocio.component.html',
  styleUrl: './modal-editar-negocio.component.css'
})
export default class ModalEditarNegocioComponent {

  // data: any;
  // datosNegocio: any;
  // folio: String | undefined;
  direccion: string | undefined; //si
  esAmbulante: boolean | undefined; //si
  actividadEconomica: string | undefined; //si
  nombreNegocio: string | undefined; //Si
  propietario: string | undefined; //si
  numeroTelefonicoNegocio: string | undefined; //si
  listadoPropietarios: ListadoPropietarios[] = [];
  propietarioSeleccionado: ListadoPropietarios | undefined;
  actividadesEconomicas: ActividadEconomica[] = [];
  actividadSeleccionada: ActividadEconomica | undefined;



  constructor(
    public config: DynamicDialogConfig,
    private requestService: ConsumeapiService
  ){}

  ngOnInit(){
    console.log(this.config.data.infoNegocio);
    this.direccion = this.config.data.infoNegocio?.direccion;
    this.esAmbulante = this.config.data.infoNegocio?.es_ambulante;
    this.actividadEconomica = this.config.data.infoNegocio?.nombre_actividad;
    this.nombreNegocio = this.config.data.infoNegocio?.nombre_negocio;
    this.propietario = this.config.data.infoNegocio?.nombre_propietario;
    this.numeroTelefonicoNegocio = this.config.data.infoNegocio?.numero_telefonico_negocio;

    this.obtenerPropietarios()
    this.obtenerActividadesEconomicas()
  }

  obtenerPropietarios(){
    this.requestService.postService("obtenerPropietarios", {}).subscribe({
      next: (response) => {
        this.listadoPropietarios = response.data;
        console.log(this.listadoPropietarios);
      }
    })
  }

  obtenerActividadesEconomicas(){
    this.requestService.postService("obtenerActividadesEconomicas", {}).subscribe({
      next: (response) => {
        this.actividadesEconomicas = response.data;
      }
    })
  }
}
