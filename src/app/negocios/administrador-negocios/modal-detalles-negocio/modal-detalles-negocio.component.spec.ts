import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesNegocioComponent } from './modal-detalles-negocio.component';

describe('ModalDetallesNegocioComponent', () => {
  let component: ModalDetallesNegocioComponent;
  let fixture: ComponentFixture<ModalDetallesNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetallesNegocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetallesNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
