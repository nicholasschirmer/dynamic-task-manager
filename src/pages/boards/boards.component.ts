//general imports
import { Component } from '@angular/core';
import { RxFor } from '@rx-angular/template/for';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { DatePipe } from '@angular/common';

// project imports
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { TicketService } from '../../services/ticket.service';
import { TicketDialogComponent } from '../../shared/ticket-dialog/ticket-dialog.component';
import { Ticket } from '../../models/ticket';
import { StatusPipe } from '../../formatters/status.pipe';

//material imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [RxFor, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, DatePipe, FormsModule, MatSelectModule, MatRadioModule, StatusPipe],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss'
})
export class BoardsComponent {

  boardEdit$: Board | null = null;

  boardNameForm = new FormGroup({
    name: new FormControl('')
  });

  ticketSort: '' | 'priotiry' | 'dueDate' = '';

  constructor(public boardState: BoardService, private dialog: MatDialog, public ticketState: TicketService) { }

  addBoard() {
    this.boardState.addBoard$({ id: uuidv4(), name: 'New Board', createdAt: new Date() });
  }

  editBoard(board: Board,) {
    this.boardNameForm.setValue(board.name ? { name: board.name } : { name: '' });
    this.boardEdit$ = board;
  }

  deleteBoard(board: Board) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {item: "board"}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardState.removeBoard$(board);
      }
    });
  }

  getTicketsForBoard(board: Board) {
    return this.ticketState.getTicketsForBoard$(board);
  }

  getTicketsForColumn(board: Board, column: string, sort: string) {
    return this.ticketState.getTicketsForColumn$(board, column, sort);
  }

  getBacklogTicketsForColumn(colunmn: string) {
    return this.ticketState.getBacklogTicketByColumn$(colunmn);
  }

  addTicket(board: Board) {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      data: { ticket: { board: board }, mode: 'add' },
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
      data: { ticket: ticket, mode: 'edit' }
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
    // this.ticketState.deleteTicket$(ticket);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {item: "ticket"}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      if (result) {
        this.ticketState.deleteTicket$(ticket);
      }
    });
  }

  onSortChange() {
    // 

  }

  onNameSubmit() {
    if (this.boardEdit$) {
      this.boardEdit$.name = this.boardNameForm.value.name!;
      this.boardState.editBoard$(this.boardState.get());
      this.boardEdit$ = null;
    }
  }
}
