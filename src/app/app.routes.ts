import { Routes } from '@angular/Router';

import { HomeComponent } from './pages/home/home.component';

export const routeConfig: Routes = [
    {path: '', component: HomeComponent},
    {path: '**', component: HomeComponent}
];
