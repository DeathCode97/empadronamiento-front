import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarNegocioComponent } from './modal-agregar-negocio.component';

describe('ModalAgregarNegocioComponent', () => {
  let component: ModalAgregarNegocioComponent;
  let fixture: ComponentFixture<ModalAgregarNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgregarNegocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
