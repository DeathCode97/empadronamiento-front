import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarPropietarioComponent } from './modal-agregar-propietario.component';

describe('ModalAgregarPropietarioComponent', () => {
  let component: ModalAgregarPropietarioComponent;
  let fixture: ComponentFixture<ModalAgregarPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgregarPropietarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
