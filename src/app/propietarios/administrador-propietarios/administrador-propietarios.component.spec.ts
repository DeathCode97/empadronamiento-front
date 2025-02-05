import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorPropietariosComponent } from './administrador-propietarios.component';

describe('AdministradorPropietariosComponent', () => {
  let component: AdministradorPropietariosComponent;
  let fixture: ComponentFixture<AdministradorPropietariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorPropietariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorPropietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
