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
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-editar-negocio',
  imports: [
    InputIconModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    FormsModule,
    InputNumber,
    Checkbox,
    SelectModule,
    ButtonModule,
    CommonModule],
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
  idNegocio: number | undefined;
  listadoPropietarios: ListadoPropietarios[] = [];
  propietarioSeleccionado: ListadoPropietarios | undefined;
  actividadesEconomicas: ActividadEconomica[] = [];
  actividadSeleccionada: ActividadEconomica | undefined;
  data: Object | undefined;
  actividadEncontrada: any;
  propietarioEncontrado: any;
  formChanged: boolean = false;


  constructor(
    public config: DynamicDialogConfig,
    private requestService: ConsumeapiService,
    public ref: DynamicDialogRef
  ){}

  ngOnInit(){
    // console.log(this.config.data.infoNegocio);
    this.direccion = this.config.data.infoNegocio?.direccion;
    this.esAmbulante = this.config.data.infoNegocio?.es_ambulante;
    this.actividadEconomica = this.config.data.infoNegocio?.nombre_actividad;
    this.nombreNegocio = this.config.data.infoNegocio?.nombre_negocio;
    this.propietario = this.config.data.infoNegocio?.nombre_propietario;
    this.numeroTelefonicoNegocio = this.config.data.infoNegocio?.numero_telefonico_negocio;
    this.idNegocio = this.config.data.infoNegocio?.folio_negocio
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
        console.log(this.actividadesEconomicas);

      }
    })
  }

  actualizarNegocio(){
    // console.log(this.nombreNegocio);
    // console.log(this.buscarIdPropietario());
    if(this.formChanged){
      // console.log("se cambio el form");
      this.data = {
        nombreNegocio: this.nombreNegocio,
        direccion: this.direccion,
        esAmbulante: this.esAmbulante === true ? 1 : 0,
        idPropietario: this.buscarIdPropietario(),
        actividadEconomica: this.buscarIdActividadEconomica(),
        numeroTelefonicoNegocio: this.numeroTelefonicoNegocio?.toString(),
        idNegocio: this.idNegocio
      }
      console.log(this.data);

      this.requestService.postService("updateNegocio", this.data).subscribe({
        next: (response) => {
            this.ref.close(response);
        }
      })
    }
    // console.log(this.data);


  }

  buscarIdActividadEconomica(){
    if(this.actividadSeleccionada?.id_actividad === undefined){
      this.actividadEncontrada = this.actividadesEconomicas.find(({ nombre_actividad }) => nombre_actividad === this.actividadEconomica)
      return this.actividadEncontrada.id_actividad
    }else{
      return this.actividadSeleccionada?.id_actividad
    }
  }

  buscarIdPropietario(){
    if(this.propietarioSeleccionado?.folio_propietario === undefined){
      this.propietarioEncontrado = this.listadoPropietarios.find(({ nombre_propietario }) => nombre_propietario === this.propietario)
      return this.propietarioEncontrado.folio_propietario;
    }else{
      return this.propietarioSeleccionado?.folio_propietario;
    }
  }

  onFieldChange() {
    this.formChanged = true;
  }

  cancelar(){
    this.ref.close();
  }
}
