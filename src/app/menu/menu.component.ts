import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-menu',
  imports: [ CommonModule, CardModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export default class MenuComponent {
  title = 'Bienvenido al Sistema de Empadronamiento';
  description = 'Aquí puedes gestionar todos los registros de manera eficiente y segura.';
}
