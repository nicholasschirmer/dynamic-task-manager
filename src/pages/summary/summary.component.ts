//general imports
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RxFor } from '@rx-angular/template/for';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';

//project imports
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { TicketDialogComponent } from '../../shared/ticket-dialog/ticket-dialog.component';
import { StatusPipe } from '../../formatters/status.pipe';

//material imports
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [ MatCardModule, MatIconModule, MatListModule, DatePipe, RxFor, MatButtonModule, StatusPipe, MatRadioModule, FormsModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  ticketSort: '' | 'priotiry' | 'dueDate' = '';

  ticketStatus: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'ALL' = 'ALL';

  constructor(public ticketState: TicketService, private dialog: MatDialog) {

  }

  getTicketForStatus(status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'ALL', sort: string) {
    return this.ticketState.getTicketForStatus$(status, sort);
  }

  addTicket() {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      data: { ticket: {board: null}, mode: 'add'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newTicket = result.ticket;
        newTicket.id = uuidv4();
        this.ticketState.addTicket$(newTicket)
      }
    });
  }

  editTicket(ticket: Ticket) {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      data: {ticket : ticket, mode: 'edit'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const tempTicket = result.ticket;
        tempTicket.id = ticket.id;
        this.ticketState.editTicket$(tempTicket);
      }
    });
  }

  deleteTicket(ticket: Ticket) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {item: 'ticket'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ticketState.deleteTicket$(ticket);
      }
    });
  }

}
