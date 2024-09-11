import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

interface DialogData {
  message: string;
}

@Component({
  selector: 'app-yes-no-confirmation-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './yes-no-confirmation-modal.component.html',
  styleUrl: './yes-no-confirmation-modal.component.scss',
})
export class YesNoConfirmationModalComponent {
  public readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  public constructor(private matDialogRef: MatDialogRef<YesNoConfirmationModalComponent>) {}

  public closeDialog(confirmed: boolean): void {
    this.matDialogRef.close(confirmed);
  }
}
