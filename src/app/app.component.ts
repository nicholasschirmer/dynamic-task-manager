//general imports
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RxFor } from '@rx-angular/template/for';
import { RouterModule } from '@angular/router';

//project imports
import { MenuItem } from '../models/menu-item';

//material imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatListModule, RxFor, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  readonly menuItems: MenuItem[] = [
    { name: 'Boards', route: '/boards' },
    { name: 'People', route: '/people' },
    { name: 'Create Ticket', route: '/new-ticket' },
  ];
  
}
