//general imports
import { Component } from '@angular/core';
import { RxFor } from '@rx-angular/template/for';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { DatePipe } from '@angular/common';

// project imports
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { TicketService } from '../../services/ticket.service';
import { TicketDialogComponent } from '../../shared/ticket-dialog/ticket-dialog.component';
import { Ticket } from '../../models/ticket';

//material imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [RxFor, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, DatePipe],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss'
})
export class BoardsComponent{

  boardEdit$: Board | null = null;

  boardNameForm = new FormGroup({
    name: new FormControl('')
  });

  constructor( public boardState: BoardService, private dialog: MatDialog, public ticketState: TicketService ) {}

  addBoard() {
    this.boardState.addBoard$({ id: uuidv4(), name: 'New Board', createdAt: new Date() });
  }

  editBoard(board: Board,) {
    this.boardNameForm.setValue( board.name? { name: board.name } : { name: '' });
    this.boardEdit$ = board;
  }

  deleteBoard(board: Board) {
    this.boardState.removeBoard$(board)
  }

  getTicketsForBoard(board: Board) {
    return this.ticketState.getTicketsForBoard$(board);
  }

  getTicketsForColumn(board: Board, column: string) {
    return this.ticketState.getTicketsForColumn$(board, column);
  }

  getBacklogTicketsForColumn(colunmn: string) {
    return this.ticketState.getBacklogTicketByColumn$(colunmn);
  }

  addTicket(board: Board) {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      data: { ticket: {board: board}, mode: 'add'},
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

  onNameSubmit() {
    if (this.boardEdit$) {
      this.boardEdit$.name = this.boardNameForm.value.name!;
      this.boardState.editBoard$(this.boardState.get());
      this.boardEdit$ = null;
    }
  }
}
