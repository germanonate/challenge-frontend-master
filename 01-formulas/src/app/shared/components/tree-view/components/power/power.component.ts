import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Expression, Power } from 'src/app/shared/entities';

type PowerSideTypes = 'expression' | 'power';

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PowerComponent {
  // Input to handler Expression
  @Input() power: Power | undefined;
  // Output to handler Expression
  @Output() powerChange = new EventEmitter<Expression>();

  /**
   * Child expression changes handler
   * @param expression 
   * @param side 
   */
  onExpressionChange(expression: Expression, side: PowerSideTypes): void {
    if (this.power) {
      if (side === 'expression') {
        this.power.expression = expression
      } else {
        this.power.power = expression;
      }
      this.powerChange.emit(this.power);
    }
  }

  /**
   * Expression delete handler
   * @param side 
   */
  onDeleteExpression(side: PowerSideTypes): void {
    this.powerChange.emit(side === 'expression' ? this.power?.power : this.power?.expression);
  }

}
