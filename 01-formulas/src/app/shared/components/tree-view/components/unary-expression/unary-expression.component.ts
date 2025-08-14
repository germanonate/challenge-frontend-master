import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { UnaryExpression, Expression } from 'src/app/shared/entities';

@Component({
  selector: 'app-unary-expression',
  templateUrl: './unary-expression.component.html',
  styleUrls: ['./unary-expression.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnaryExpressionComponent {
  // Input to handler Expression
  @Input() unaryExpr: UnaryExpression | undefined;
  // Output to handler Expression
  @Output() unaryExprChange = new EventEmitter<Expression>();

  /**
   * Child expression changes handler
   * @param expression 
   */
  onExpressionChange(expression: Expression): void {
    if (this.unaryExpr) {
      this.unaryExpr.expression = expression;
      this.unaryExprChange.emit(this.unaryExpr);
    }
  }

}
