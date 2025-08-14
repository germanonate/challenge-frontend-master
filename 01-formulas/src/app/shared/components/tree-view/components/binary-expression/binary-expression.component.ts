import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BinaryExpression, BinaryExpTypes, Expression } from 'src/app/shared/entities';
import { getOperationalSign } from 'src/app/shared/utils';

type BynaryExprSideTypes = 'left' | 'right';

@Component({
  selector: 'app-binary-expression',
  templateUrl: './binary-expression.component.html',
  styleUrls: ['./binary-expression.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinaryExpressionComponent implements OnInit {
  // Input to handler Expression
  @Input() binaryExpr: BinaryExpression | undefined;
  // Input to handler Expression
  @Output() binaryExprChange = new EventEmitter<Expression>();
  // Binary Operations Selector
  binaryOperations: { value: BinaryExpTypes, label: string }[] = [];

  ngOnInit(): void {
    this.binaryOperations = Object.values(BinaryExpTypes).map((binaryType: BinaryExpTypes) => ({ value: binaryType, label: getOperationalSign(binaryType) }));
  }

  /**
   * Type selector handler
   * @param event 
   */
  onTypeChange(event: BinaryExpTypes): void {
    if (this.binaryExpr) {
      this.binaryExpr.type = event;
      this.binaryExprChange.emit(this.binaryExpr);
    }
  }

  /**
   * Expression delete handler
   * @param side 
   */
  onDeleteExpression(side: BynaryExprSideTypes): void {
    this.binaryExprChange.emit(side === 'left' ? this.binaryExpr?.right : this.binaryExpr?.left);
  }

  /**
   * Child expression changes handler
   * @param expression 
   * @param side 
   */
  onExpressionChange(expression: Expression, side: BynaryExprSideTypes): void {
    if (this.binaryExpr) {
      if (side === 'left') {
        this.binaryExpr.left = expression
      } else {
        this.binaryExpr.right = expression;
      }
      this.binaryExprChange.emit(this.binaryExpr);
    }
  }

}
