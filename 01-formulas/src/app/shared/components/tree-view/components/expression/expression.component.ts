import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BinaryExpression, UnaryExpression, Expression, Value, Var, Power, Symbol, Func, BinaryExpTypes, ValueTypes, } from 'src/app/shared/entities';
import { isLeaf, isBinaryExpression, isUnaryExpression, isPower, isFunction, isSymbol } from 'src/app/shared/utils';

type exprType = 'leaf' | 'binaryExpr' | 'unaryExpr' | 'symbol' | 'power' | 'function';

const DEFAULT_ADDITION: Value = {
  type: ValueTypes.NUMBER,
  value: 10
}

@Component({
  selector: 'app-expression',
  templateUrl: './expression.component.html',
  styleUrls: ['./expression.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpressionComponent implements OnInit, OnChanges {
  // Root expression
  @Input() root: boolean = false;
  // Allow or not delete action
  @Input() allowDelete: boolean = true;
  // Input to handler Expression
  @Input() expression: Expression | undefined;
  // Output to handler Expression
  @Output() expressionChange = new EventEmitter<Expression>();
  // Output to handler Expression delete
  @Output() delete = new EventEmitter<Expression>();

  /**
   * Expression type
   * internal type used to template checks
   */
  type: exprType | undefined;

  // Interfaces used to cast object in template
  Leaf: Value | Var | undefined;
  BinaryExpression: BinaryExpression | undefined;
  UnaryExpression: UnaryExpression | undefined;
  Power: Power | undefined;
  Symbol: Symbol | undefined;
  Func: Func | undefined;

  ngOnInit(): void {
    if (this.expression) {
      this.assignInternalType();
    }
  }

  ngOnChanges({ expression }: SimpleChanges): void {
    if (expression && !expression.firstChange) {
      this.assignInternalType();
    }
  }

  /**
   * Paren expression changes handler
   * @param expression 
   */
  onParenExpressionChange(expression: Expression): void {
    if (this.expression && isSymbol(this.expression)) {
      (this.expression as Symbol).expression = expression;
      this.expressionChange.emit(this.expression);
    }
  }

  /**
   * Expression changes handler
   * @param expression 
   */
  onExpressionChange(expression: Expression): void {
    if (this.expression) {
      this.expression = expression;
      this.assignInternalType();
      this.expressionChange.emit(this.expression);
    }
  }

  /**
   * Expression delete handler
   */
  onDeleteExpression(): void {
    this.delete.emit(this.expression);
  }

  /**
   * Expression add handler
   */
  onAddExpression(): void {
    if (this.expression) {
      this.expression = {
        type: BinaryExpTypes.ADDITION,
        left: this.expression,
        right: DEFAULT_ADDITION
      };
      this.assignInternalType();
      this.expressionChange.emit(this.expression);
    }
  }

  /**
   * Method to assign internal type 
   * based on expression
   */
  private assignInternalType(): void {
    this.type = isLeaf(this.expression) ? 'leaf' :
      isBinaryExpression(this.expression) ? 'binaryExpr' :
        isUnaryExpression(this.expression) ? 'unaryExpr' :
          isSymbol(this.expression) ? 'symbol' :
            isPower(this.expression) ? 'power' :
              isFunction(this.expression) ? 'function' : undefined;;
  }

}
