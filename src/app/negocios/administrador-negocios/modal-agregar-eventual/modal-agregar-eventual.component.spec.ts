import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarEventualComponent } from './modal-agregar-eventual.component';

describe('ModalAgregarEventualComponent', () => {
  let component: ModalAgregarEventualComponent;
  let fixture: ComponentFixture<ModalAgregarEventualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgregarEventualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarEventualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
