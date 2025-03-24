import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGenerarQrComponent } from './modal-generar-qr.component';

describe('ModalGenerarQrComponent', () => {
  let component: ModalGenerarQrComponent;
  let fixture: ComponentFixture<ModalGenerarQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalGenerarQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGenerarQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
