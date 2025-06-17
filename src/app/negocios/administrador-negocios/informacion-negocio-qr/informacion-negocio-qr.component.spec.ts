import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionNegocioQrComponent } from './informacion-negocio-qr.component';

describe('InformacionNegocioQrComponent', () => {
  let component: InformacionNegocioQrComponent;
  let fixture: ComponentFixture<InformacionNegocioQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionNegocioQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionNegocioQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
