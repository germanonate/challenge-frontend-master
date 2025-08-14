import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type SymbolType = 'paren'; // to add 'bracket' in the future
type SymbolState = 'open' | 'close';

@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SymbolComponent {
  // Symbol type
  @Input() type: SymbolType | undefined;
  // Symbol state
  @Input() state: SymbolState | undefined;
}
