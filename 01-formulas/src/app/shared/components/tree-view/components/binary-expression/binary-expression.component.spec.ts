import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryExpressionComponent } from './binary-expression.component';

describe('BinaryExpressionComponent', () => {
  let component: BinaryExpressionComponent;
  let fixture: ComponentFixture<BinaryExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinaryExpressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
