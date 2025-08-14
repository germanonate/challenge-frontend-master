import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Value, Var } from 'src/app/shared/entities';

@Component({
  selector: 'app-leaf',
  templateUrl: './leaf.component.html',
  styleUrls: ['./leaf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafComponent {
  // Input to handler Expression
  @Input() leaf: Value | Var | undefined;
  // Output to handler Expression
  @Output() leafChange = new EventEmitter<Value>();

  /**
   * Input value change handler
   */
  onValueChange(): void {
    if (this.leaf?.type === 'NUMBER') {
      this.leafChange.emit(this.leaf);
    }
  }

}
