import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  data = inject(MAT_DIALOG_DATA);

  constructor(private dialog: MatDialogRef<ConfirmationDialogComponent>) {

  }

  closeDialog() {
    this.dialog.close(false);
  }

  confirm() {
    this.dialog.close(true);
  }

}
