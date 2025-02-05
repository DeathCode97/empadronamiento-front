import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorNegociosComponent } from './administrador-negocios.component';

describe('AdministradorNegociosComponent', () => {
  let component: AdministradorNegociosComponent;
  let fixture: ComponentFixture<AdministradorNegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorNegociosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
