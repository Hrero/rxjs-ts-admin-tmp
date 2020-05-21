import { NgModule } from '@angular/core';
import { LayoutModule } from '../layout/layout.module';
import { RouteRoutingModule } from './routes-routing.module';


const COMPONENTS = [
];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [
        RouteRoutingModule
    ],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT]
})
export class RoutesModule {}
