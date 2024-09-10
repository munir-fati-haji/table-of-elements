import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PeriodicElement } from '../../elements.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

interface DialogData {
  rowData: PeriodicElement;
  mode: string;
}

@Component({
  selector: 'app-manage-elements',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './manage-elements.component.html',
  styleUrl: './manage-elements.component.scss',
})
export class ManageElementsComponent {
  public readonly data = inject<DialogData>(MAT_DIALOG_DATA);
}
