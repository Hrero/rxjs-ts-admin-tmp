import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
// passport pages

const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
    },
    // 单页不包裹Layout
    { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: environment.useHash,
            scrollPositionRestoration: 'top',
        }),
    ],
    exports: [RouterModule],
})
export class RouteRoutingModule { }
