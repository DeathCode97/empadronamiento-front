import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ListadoPropietarios } from '../../../propietarios/interfaces/Propietarios';
import { ActividadEconomica } from "../../../interfaces/ActividadEconmica"
import { Checkbox } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { ConsumeapiService } from '../../../services/consumeapi.service'

@Component({
  selector: 'app-modal-agregar-negocio',
  imports: [
    StepperModule,
    ButtonModule,
    InputIconModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    FormsModule,
    InputNumber,
    Checkbox,
    SelectModule
  ],
  templateUrl: './modal-agregar-negocio.component.html',
  styleUrl: './modal-agregar-negocio.component.css'
})
export default class ModalAgregarNegocioComponent {
  nombreNegocio: string | undefined;
  direccionNegocio: string | undefined;
  esAmbulante: boolean | undefined;
  listadoPropietarios: ListadoPropietarios[] = [];
  propietarioSeleccionado: ListadoPropietarios | undefined;
  actividadesEconomicas: ActividadEconomica[] = [];
  actividadSeleccionada: ActividadEconomica | undefined;
  telefonoNegocio: string | undefined;
  formChanged: boolean = false;

  constructor(
    private requestService: ConsumeapiService
  ){

  }

  ngOnInit(){
    this.obtenerPropietarios();
    this.obtenerActividadesEconomicas();
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

  onFieldChange() {
    this.formChanged = true;
  }
}
