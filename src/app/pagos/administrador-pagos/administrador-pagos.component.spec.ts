import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorPagosComponent } from './administrador-pagos.component';

describe('AdministradorPagosComponent', () => {
  let component: AdministradorPagosComponent;
  let fixture: ComponentFixture<AdministradorPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorPagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
