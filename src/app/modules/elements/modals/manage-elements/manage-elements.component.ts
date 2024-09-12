import { Component, inject, OnInit, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PeriodicElement } from '../../models/periodic-element';
import { ELEMENT_MODAL_MODE } from '../../enums/elements-modal-open-mode';
import { ELEMENTS_MODAL_FIELDS } from '../../enums/fields';

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
export class ManageElementsComponent implements OnInit {
  protected readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  protected readonly position = signal<number | null>(null);
  protected readonly name = signal<string | null>(null);
  protected readonly symbol = signal<string | null>(null);
  protected readonly weight = signal<number | null>(null);
  protected saveDisabled =  true;
  protected ELEMENTS_MODAL_FIELDS = ELEMENTS_MODAL_FIELDS;

  public constructor(public matDialogRef: MatDialogRef<ManageElementsComponent>) {}

  public ngOnInit(): void {
    if (this.data.mode === ELEMENT_MODAL_MODE.EDIT) {
      this.setElementData(this.data.rowData);
    }
    this.checkIfFormIsValid();
  }

  protected handleInputChange(event: Event, field: ELEMENTS_MODAL_FIELDS): void {
    const value = (event.target as HTMLInputElement).value;
    switch (field) {
    case ELEMENTS_MODAL_FIELDS.POSITION:
    case ELEMENTS_MODAL_FIELDS.WEIGHT:
      this[field].set(Number(value));
      break;
    default:
      this[field].set(value as string);
    }
    this.checkIfFormIsValid();
  }

  protected onSave(): void {
    const element: PeriodicElement = {
      name: this.name() as string,
      position: this.position() as number,
      symbol: this.symbol() as string,
      weight: this.weight() as number,
    };
    this.matDialogRef.close( { mode: this.data.mode, element } );
  }

  private setElementData(element: PeriodicElement): void {
    this.position.set(element.position);
    this.name.set(element.name);
    this.symbol.set(element.symbol);
    this.weight.set(element.weight);
  }

  private checkIfFormIsValid(): void {
    this.saveDisabled = !this.position() || !this.name() || !this.symbol() || !this.weight();
  }
}
