import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service'

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
  template: `
    <div class="loading-overlay" *ngIf="loadingService.loading$ | async">
      <div class="spinner"></div>
    </div>
  `
})
export class LoadingComponent {

  constructor(public loadingService: LoadingService) {}

}
