import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorServiciosComponent } from './administrador-servicios.component';

describe('AdministradorServiciosComponent', () => {
  let component: AdministradorServiciosComponent;
  let fixture: ComponentFixture<AdministradorServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorServiciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
