import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMostrarNegociosComponent } from './modal-mostrar-negocios.component';

describe('ModalMostrarNegociosComponent', () => {
  let component: ModalMostrarNegociosComponent;
  let fixture: ComponentFixture<ModalMostrarNegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMostrarNegociosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMostrarNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
