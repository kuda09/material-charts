///<reference path="../../node_modules/@angular/router/src/router_module.d.ts"/>
import {ModuleWithProviders, NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {DashboardsComponent} from "./pages/dashboards/dashboards.component";
import {VisualisationsComponent} from "./pages/visualisations/visualisations.component";
import {AboutComponent} from "./pages/settings/about/about.component";
import {StatusComponent} from "./pages/settings/status/status.component";
import {IndicesComponent} from "./pages/settings/indices/indices.component";
import {SettingsComponent} from "./pages/settings/settings/settings.component";
import {AuthGuard} from "./services/auth-guard.service";
import {LoginComponent} from "./pages/home/login/login.component";
import {ViewDashboardComponent} from "./pages/dashboards/view-dashboard/view-dashboard.component";
import {EditDashboardComponent} from "./pages/dashboards/edit-dashboard/edit-dashboard.component";
import {CreateVisualisationComponent} from "./pages/visualisations/create-visualisation/create-visualisation.component";
import {VisTypesComponent} from "./pages/settings/vis-types/vis-types.component";
import {VisualisationComponent} from "./pages/visualisations/visualisation/visualisation.component";
import {EditVisTypeComponent} from "./pages/settings/vis-types/edit-vis-type/edit-vis-type.component";
import {Auth} from "./services/auth.service";

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboards',
        component: DashboardsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboards/:id',
        component: ViewDashboardComponent,
        children: [
            {
                path: 'edit',
                component: EditDashboardComponent
            }
        ],
        canActivate: [AuthGuard]

    },
    {
        path: 'visualisations',
        children: [
            {
                path: '',
                component: VisualisationsComponent
            },
            {
                path: 'create',
                children: [
                    {
                        path: '',
                        component: CreateVisualisationComponent
                    }
                ],
            }
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'visualisation/:id',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: VisualisationComponent
            }
        ]
    },
    {
        path: 'settings',
        canActivate: [AuthGuard],
        children: [

            {
                path: '',
                component: SettingsComponent
            },
            {
                path: 'indices',
                component: IndicesComponent
            },
            {
                path: 'status',
                component: StatusComponent
            },
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: 'vis-types',
                children: [
                    {
                        path: '',
                        component: VisTypesComponent
                    },
                    {
                        path: ':id/edit',
                        component: EditVisTypeComponent
                    }
                ]
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    // otherwise redirect to home
    {path: '**', redirectTo: ''}
];

export const appRoutingProviders: any[] = [
    [AuthGuard, Auth]
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


@NgModule
({
    imports:   [ RouterModule.forRoot(appRoutes)],
    exports:   [ RouterModule],
    providers: [ AuthGuard, Auth ] // <- provide guard
})
export class AppRoutingModule {}
