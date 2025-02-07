import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarPropietarioComponent } from './modal-editar-propietario.component';

describe('ModalEditarPropietarioComponent', () => {
  let component: ModalEditarPropietarioComponent;
  let fixture: ComponentFixture<ModalEditarPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarPropietarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
