import { Component } from '@angular/core';
import { TableAction } from '../../shared/models/table-action';
import { TableComponent } from '../../shared/components/table/table.component';
import { DialogUtils } from '../../shared/utils/dialog-utils';
import { ManageElementsComponent } from './modals/manage-elements/manage-elements.component';
import { YesNoConfirmationModalComponent } from '../../shared/components/yes-no-confirmation-modal/yes-no-confirmation-modal.component';
import { filter } from 'rxjs';
import { PreviewElementsComponent } from './modals/preview-elements/preview-elements.component';
import { NotificationUtils } from '../../shared/utils/notification-utils';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface ActionEvent {
  event: string;
  element: PeriodicElement;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.scss',
})
export class ElementsComponent {
  public displayedColumns = ['position', 'name', 'weight', 'symbol'];
  public rowData: PeriodicElement[] = ELEMENT_DATA;
  public actionList: TableAction[] = [
    {
      icon: 'edit',
      text: 'Edit',
    },
    {
      icon: 'delete',
      text: 'Delete',
    },
    {
      icon: 'remove_red_eye',
      text: 'Preview',
    },
  ];

  public onActionClick(value: ActionEvent): void {
    const EventToActionClickMap: Record<string, () => void> = {
      Edit: () => this.onEdit(value),
      Delete: () => this.onDelete(value),
      Preview: () => this.onPreview(value),
    };
    const action = EventToActionClickMap[value.event];
    action();
  }

  private onEdit(value: ActionEvent): void {
    DialogUtils.openLargeDialog(ManageElementsComponent, {
      rowData: value.element,
      mode: value.event,
    });
  }

  private onDelete(value: ActionEvent): void {
    const message =
      'Are you sure? You are about to delete the selected elements data';
    DialogUtils.openLargeDialog(YesNoConfirmationModalComponent, { message })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.rowData = this.rowData.filter(
          (data) => data.position !== value.element.position,
        );
        NotificationUtils.showWarningNotification(`Sucessfully deleted element ${value.element.name}`);
      });
  }

  private onPreview(value: ActionEvent): void {
    DialogUtils.openLargeDialog(PreviewElementsComponent, {
      rowData: value.element,
      mode: value.event,
    });
  }
}
