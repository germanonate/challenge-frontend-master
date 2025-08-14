import { Component } from '@angular/core';

// @ts-ignore
import * as Parser from './shared/parser/formula-parser.js';
import { Expression } from './shared/entities';

const parse = Parser.parse;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formula: string = "($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)";
  syntaxTreeJson: string = "";
  expression: Expression | undefined;

  processFormula() {
    console.log('creating ast view...');
    this.expression = parse(this.formula) as Expression;
    console.log('The ast is: ', this.expression);
    this.syntaxTreeJson = JSON.stringify(this.expression, null, 2);
  }

}
