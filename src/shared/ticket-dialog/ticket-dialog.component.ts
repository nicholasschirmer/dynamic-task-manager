//general imports
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RxFor } from '@rx-angular/template/for';

//project imports
import { Person } from '../../models/person';
import { TicketDialog } from '../../models/ticket-dialog';
import { Board } from '../../models/board';

//material imports
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-ticket-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: "en-ZA" }],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatInputModule, MatButtonModule, RxFor],
  templateUrl: './ticket-dialog.component.html',
  styleUrl: './ticket-dialog.component.scss'
})
export class TicketDialogComponent implements OnInit{

  data: TicketDialog = inject(MAT_DIALOG_DATA);

  ticketForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    assignee: new FormControl<Person | null>(null),
    status: new FormControl<'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'>('PENDING'),
    dueDate: new FormControl<Date>(new Date(), [Validators.required]),
    priority: new FormControl<'LOW' | 'MEDIUM' | 'HIGH'>('LOW'),
    board: new FormControl<Board | null>(null),
    createdAt: new FormControl<Date>(new Date())
  })

  constructor(private dialog: MatDialogRef<TicketDialogComponent>, public boardState: BoardService) { }

  closeDialog() {
    this.dialog.close();
  }

  onSubmit() {
    this.dialog.close({ticket: this.ticketForm.value, mode: this.data.mode});
  }

  ngOnInit() {
    this.ticketForm.patchValue(this.data.ticket);
  }

}
