//genaral imports
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

//material imports
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../../models/person';

//project imports

@Component({
  selector: 'app-person-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './person-dialog.component.html',
  styleUrl: './person-dialog.component.scss'
})
export class PersonDialogComponent implements OnInit{
  
  data: Person = inject<Person>(MAT_DIALOG_DATA);

  personForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  })

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.data) {
      this.personForm.setValue({ firstName: this.data.firstName, lastName: this.data.lastName });
    }
  }

}
