import { Routes } from '@angular/router';
import { BoardsComponent } from '../pages/boards/boards.component';
import { NoPageComponent } from '../pages/no-page/no-page.component';
import { SummaryComponent } from '../pages/summary/summary.component';

// using simple routes makes sense for the scale of the application
export const routes: Routes = [
    {path: '', redirectTo: 'summary', pathMatch: 'full'},
    {path: 'boards', component: BoardsComponent, pathMatch: 'full'},
    {path: 'summary', component: SummaryComponent, pathMatch: 'full'},
    {path: '**', component: NoPageComponent, pathMatch: 'full'}
];
