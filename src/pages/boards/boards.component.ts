//general imports
import { Component } from '@angular/core';
import { RxFor } from '@rx-angular/template/for';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

// project imports
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';

//material imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [RxFor, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss'
})
export class BoardsComponent{

  boardEdit$: Board | null = null;

  boardNameForm = new FormGroup({
    name: new FormControl('')
  });

  constructor( public boardState: BoardService ) {
  }

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

  onNameSubmit() {
    if (this.boardEdit$) {
      this.boardEdit$.name = this.boardNameForm.value.name!;
      this.boardState.editBoard$(this.boardState.get());
      this.boardEdit$ = null;
    }
  }
}
