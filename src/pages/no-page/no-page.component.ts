// general imports
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

//material imports
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-no-page',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './no-page.component.html',
  styleUrl: './no-page.component.scss'
})
export class NoPageComponent {

}
