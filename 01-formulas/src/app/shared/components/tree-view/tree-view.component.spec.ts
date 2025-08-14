import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BinaryExpTypes, Expression, FuncTypes, SymbolTypes, ValueTypes } from '../../entities';
import { BinaryExpressionComponent, ExpressionComponent, FunctionComponent, LeafComponent, SymbolComponent } from './components';

import { TreeViewComponent } from './tree-view.component';
import { AsPipe } from './pipes/as.pipe';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SimpleChange } from '@angular/core';



const MOCK_1: Expression = {
  type: BinaryExpTypes.DIVISION,
  left: {
    type: SymbolTypes.PAREN,
    expression: {
      type: BinaryExpTypes.ADDITION,
      left: {
        type: "VARIABLE",
        name: "$b"
      },
      right: {
        type: "FUNCTION",
        name: FuncTypes.SQRT,
        arguments: [
          {
            type: BinaryExpTypes.SUBTRACTION,
            left: {
              type: "FUNCTION",
              name: FuncTypes.SQR,
              arguments: [
                {
                  type: "VARIABLE",
                  name: "$b"
                }
              ]
            },
            right: {
              type: BinaryExpTypes.MULTIPLICATION,
              left: {
                type: ValueTypes.NUMBER,
                value: 4
              },
              right: {
                type: "VARIABLE",
                name: "$a"
              }
            }
          }
        ]
      }
    }
  },
  right: {
    type: SymbolTypes.PAREN,
    expression: {
      type: BinaryExpTypes.MULTIPLICATION,
      left: {
        type: ValueTypes.NUMBER,
        value: 2
      },
      right: {
        type: "VARIABLE",
        name: "$a"
      }
    }
  }
};
const FORMULA_1: string = "($b + SQRT(SQR($b) - 4 * $a)) / (2 * $a)";

const MOCK_2: Expression = {
  left: { type: ValueTypes.PI, value: 3.141592653589793 },
  right: {
    type: 'FUNCTION', name: FuncTypes.SQR, arguments: [
      { type: 'VARIABLE', name: '$r' }
    ]
  },
  type: BinaryExpTypes.MULTIPLICATION
};
const FORMULA_2: string = 'PI * SQR($r)';

const MOCK_3: Expression = {
  expression: {
    expression: {
      expression: {
        type: ValueTypes.NUMBER,
        value: 2
      },
      power: {
        type: ValueTypes.PI,
        value: 3.141592653589793
      },
      type: 'POWER'
    },
    type: SymbolTypes.PAREN
  },
  type: 'NEGATION'
};
const FORMULA_3: string = '- (2 ^ PI)';

describe('TreeViewComponent', () => {
  let component: TreeViewComponent;
  let nativeElement: HTMLElement;
  let fixture: ComponentFixture<TreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeViewComponent, ExpressionComponent, AsPipe, BinaryExpressionComponent, LeafComponent, FunctionComponent, SymbolComponent],
      imports: [
        NzSelectModule,
        NzTagModule,
        NzDropDownModule,
        NzIconModule,
        NzInputNumberModule,
        BrowserAnimationsModule,
        FormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewComponent);
    component = fixture.componentInstance;

    // Set initial expression value before initial change detection
    component.expression = MOCK_1;

    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a formula', () => {
    // Check if <pre> element contains the setted value
    const preElem = nativeElement.querySelector('#treeToFormula') as HTMLPreElement;
    expect(preElem.textContent).toBe(FORMULA_1);
  });

  it('should display a new formula after expression change', () => {
    component.expression = MOCK_2;
    // Needed to run change detection in the component
    component.ngOnChanges({
      expression: new SimpleChange(MOCK_1, MOCK_2, false)
    })

    // Run change detection to update the template
    fixture.detectChanges();
    // Check if formula element contains the setted value
    expect(component.formula).toBe(FORMULA_2);
  });

  it('should display a new formula after a second expression change', () => {
    component.expression = MOCK_3;
    // Needed to run change detection in the component
    component.ngOnChanges({
      expression: new SimpleChange(MOCK_2, MOCK_3, false)
    })

    // Run change detection to update the template
    fixture.detectChanges();
    // Check if formula element contains the setted value
    expect(component.formula).toBe(FORMULA_3);
  });
});
