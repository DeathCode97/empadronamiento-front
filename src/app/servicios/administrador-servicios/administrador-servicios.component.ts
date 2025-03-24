import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ConsumeapiService } from '../../services/consumeapi.service'
import { TitleStrategy } from '@angular/router';
import { Table } from 'primeng/table';
import { ButtonLabel, ButtonModule } from 'primeng/button';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-administrador-servicios',
  imports: [
    TreeTableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './administrador-servicios.component.html',
  styleUrl: './administrador-servicios.component.css'
})

export default class AdministradorServiciosComponent {
  entities!: TreeNode[];
  jsonEntidades: any | undefined;
  globalFilterValue: string = ''

  constructor(
    private requestService: ConsumeapiService,
  ){}

  ngOnInit(){
    this.obtenerJsonEntidades();
  }

  obtenerJsonEntidades(){
    this.requestService.postService("obtenerNodosEntidades", {}).subscribe({
      next: (response) => {
        // jsonEntidades =
        // console.log(response.data);
        response.data.forEach(element => {
            // console.log(element["generar_servicios_tree"]);
            this.jsonEntidades = JSON.parse(element["generar_servicios_tree"]);
        });
        this.entities = [this.jsonEntidades][0];
        console.log(this.entities);

      }
    })
  }

  applyGlobalFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.globalFilterValue = input.value;
  }
}
