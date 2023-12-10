import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestalleReporteComponent } from './destalle-reporte.component';

describe('DestalleReporteComponent', () => {
  let component: DestalleReporteComponent;
  let fixture: ComponentFixture<DestalleReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestalleReporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestalleReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
