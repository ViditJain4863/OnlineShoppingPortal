import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarosuelComponent } from './carosuel.component';

describe('CarosuelComponent', () => {
  let component: CarosuelComponent;
  let fixture: ComponentFixture<CarosuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarosuelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarosuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
