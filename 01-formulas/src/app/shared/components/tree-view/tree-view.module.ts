import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TreeViewComponent } from './tree-view.component';
import { ExpressionComponent, LeafComponent, FunctionComponent, SymbolComponent, BinaryExpressionComponent, PowerComponent, UnaryExpressionComponent } from './components';

// ng-zorro
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

import { AsPipe } from './pipes/as.pipe';


@NgModule({
  declarations: [
    TreeViewComponent,
    ExpressionComponent,
    LeafComponent,
    FunctionComponent,
    FunctionComponent,
    SymbolComponent,
    BinaryExpressionComponent,
    PowerComponent,
    UnaryExpressionComponent,
    AsPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    NzTagModule,
    NzDropDownModule,
    NzIconModule,
    NzInputNumberModule
  ],
  exports: [TreeViewComponent]
})
export class TreeViewModule { }
