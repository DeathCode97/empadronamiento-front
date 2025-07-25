import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarProteccionComponent } from './modal-editar-proteccion.component';

describe('ModalEditarProteccionComponent', () => {
  let component: ModalEditarProteccionComponent;
  let fixture: ComponentFixture<ModalEditarProteccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarProteccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarProteccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
