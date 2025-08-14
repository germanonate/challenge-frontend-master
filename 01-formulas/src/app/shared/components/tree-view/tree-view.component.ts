import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Expression } from '../../entities';
import { expressionToFormula } from '../../utils';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewComponent implements OnInit, OnChanges {
  @Input() expression: Expression | undefined;
  // To display original tree and changes in runtime
  formula: string = '';

  constructor() { }

  ngOnInit(): void {
    this.convertAstToFormula();
  }

  ngOnChanges({ expression }: SimpleChanges): void {
    if (expression && !expression.firstChange) {
      this.convertAstToFormula();
    }
  }

  /**
   * Handler for Expression changes
   * @param event 
   */
  onExpressionChange(event: Expression): void {
    if (this.expression) {
      this.expression = event;
      this.convertAstToFormula();
    }
  }

  /**
   * Converts Expression to formula string
   * To be updated with expression changes
   */
  private convertAstToFormula(): void {
    if (this.expression) {
      this.formula = expressionToFormula(this.expression);
    }
  }

}
