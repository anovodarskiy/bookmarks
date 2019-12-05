import { NgModule } from '@angular/core';

import { GroupByFieldPipe } from './transformArray.pipe';


@NgModule({
  declarations: [GroupByFieldPipe],
  exports: [GroupByFieldPipe]
})
export class PipesModule { }
