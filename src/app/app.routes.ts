import { Routes } from '@angular/router';
import { BoardsComponent } from '../pages/boards/boards.component';
import { NoPageComponent } from '../pages/no-page/no-page.component';

// using simple routes makes sense for the scale of the application
export const routes: Routes = [
    {path: '', redirectTo: 'boards', pathMatch: 'full'},
    {path: 'boards', component: BoardsComponent, pathMatch: 'full'},
    {path: '**', component: NoPageComponent, pathMatch: 'full'}
];
