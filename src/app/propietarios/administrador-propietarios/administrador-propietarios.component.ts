import { ListadoPropietarios } from './../interfaces/Propietarios';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
// import { ListadoPropietarios } from "../interfaces/Propietarios"
import { ConsumeapiService } from '../../services/consumeapi.service'
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Table } from 'primeng/table';

// import { BrowserModule } from '@angular/platform-browser';
// import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-administrador-propietarios',
  imports: [
    TableModule,
    ButtonModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    // BrowserModule
  ],
  templateUrl: './administrador-propietarios.component.html',
  styleUrl: './administrador-propietarios.component.css'
})
export default class AdministradorPropietariosComponent {
  listadoPropietarios: ListadoPropietarios[] = [];

  // globalFilter: string;


  constructor(
    private requestService: ConsumeapiService
  ){}

  ngOnInit(){

    this.requestService.postService("obtenerPropietarios", {}).subscribe({
      next: (response) => {
        this.listadoPropietarios = response.data;
        console.log(response);
      }
    })

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


}
