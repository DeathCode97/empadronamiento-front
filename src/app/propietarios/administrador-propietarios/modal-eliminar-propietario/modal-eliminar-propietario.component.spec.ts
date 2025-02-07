import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarPropietarioComponent } from './modal-eliminar-propietario.component';

describe('ModalEliminarPropietarioComponent', () => {
  let component: ModalEliminarPropietarioComponent;
  let fixture: ComponentFixture<ModalEliminarPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEliminarPropietarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEliminarPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
