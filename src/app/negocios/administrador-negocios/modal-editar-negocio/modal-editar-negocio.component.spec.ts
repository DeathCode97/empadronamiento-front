import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarNegocioComponent } from './modal-editar-negocio.component';

describe('ModalEditarNegocioComponent', () => {
  let component: ModalEditarNegocioComponent;
  let fixture: ComponentFixture<ModalEditarNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarNegocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
