import { ChangeDetectionStrategy, Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Expression, Func, FuncTypes } from 'src/app/shared/entities';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunctionComponent implements OnInit {
  // Input to handler Expression
  @Input() function: Func | undefined;
  // Output to handler Expression
  @Output() functionChange = new EventEmitter<Expression>();
  // Function Types Selector
  funcTypes: string[] = [];

  ngOnInit(): void {
    this.funcTypes = Object.values(FuncTypes);
  }

  /**
   * Function name handler
   * @param event 
   */
  onNameChange(event: FuncTypes): void {
    if (this.function) {
      this.function.name = event;
      this.functionChange.emit(this.function);
    }
  }

  /**
   * Argument expression changes handler
   * @param argument 
   * @param index 
   */
  onExpressionChange(argument: Expression, index: number): void {
    if (this.function?.arguments[index]) {
      this.function.arguments[index] = argument;
      this.functionChange.emit(this.function);
    }
  }

}
