import { NgModule } from '@angular/core';
import { LayoutDefaultComponent } from './default/default.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
const COMPONENTS = [
    LayoutDefaultComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    NgZorroAntdModule
  ],
  exports: [...COMPONENTS],
})
export class LayoutModule {}
