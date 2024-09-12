import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PeriodicElement } from '../../models/periodic-element';

interface DialogData {
  rowData: PeriodicElement;
  mode: string;
}

@Component({
  selector: 'app-preview-elements',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './preview-elements.component.html',
  styleUrl: './preview-elements.component.scss',
})
export class PreviewElementsComponent {
  public readonly data = inject<DialogData>(MAT_DIALOG_DATA);
}
