import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociosEventualesComponent } from './negocios-eventuales.component';

describe('NegociosEventualesComponent', () => {
  let component: NegociosEventualesComponent;
  let fixture: ComponentFixture<NegociosEventualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NegociosEventualesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegociosEventualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
