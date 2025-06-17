import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBusquedaQrComponent } from './modal-busqueda-qr.component';

describe('ModalBusquedaQrComponent', () => {
  let component: ModalBusquedaQrComponent;
  let fixture: ComponentFixture<ModalBusquedaQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBusquedaQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBusquedaQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
