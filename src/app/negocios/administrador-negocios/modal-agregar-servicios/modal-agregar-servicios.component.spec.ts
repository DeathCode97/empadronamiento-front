import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarServiciosComponent } from './modal-agregar-servicios.component';

describe('ModalAgregarServiciosComponent', () => {
  let component: ModalAgregarServiciosComponent;
  let fixture: ComponentFixture<ModalAgregarServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgregarServiciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
