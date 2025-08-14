import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnaryExpressionComponent } from './unary-expression.component';

describe('UnaryExpressionComponent', () => {
  let component: UnaryExpressionComponent;
  let fixture: ComponentFixture<UnaryExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnaryExpressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnaryExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
