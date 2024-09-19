import { Component } from '@angular/core';
import { TableAction } from '../../shared/models/table-action';
import { TableComponent } from '../../shared/components/table/table.component';
import { DialogUtils } from '../../shared/utils/dialog-utils';
import { ManageElementsComponent } from './modals/manage-elements/manage-elements.component';
import { YesNoConfirmationModalComponent } from '../../shared/components/yes-no-confirmation-modal/yes-no-confirmation-modal.component';
import { filter } from 'rxjs';
import { PreviewElementsComponent } from './modals/preview-elements/preview-elements.component';
import { MatCardModule } from '@angular/material/card';
import { ElementsService } from './services/elements.service';
import { PeriodicElement } from './models/periodic-element';
import { PipeUtils } from '../../shared/utils/pipe-utils';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface ActionEvent {
  event: string;
  element: PeriodicElement;
}

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [TableComponent, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.scss',
})
export class ElementsComponent {
  protected displayedColumns = ['position', 'name', 'weight', 'symbol'];
  protected rowData!: PeriodicElement[];
  protected actionList: TableAction[] = [
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

  public constructor(private elementsService: ElementsService) {
    this.initiateComponentData();
  }

  protected addElement(): void {
    const element = {} as PeriodicElement;
    const event = 'Add';
    this.onManageElement({ element, event });
  }

  protected onActionClick(value: ActionEvent): void {
    const EventToActionClickMap: Record<string, () => void> = {
      Edit: () => this.onManageElement(value),
      Delete: () => this.onDelete(value),
      Preview: () => this.onPreview(value),
    };
    const action = EventToActionClickMap[value.event];
    action();
  }

  protected initiateComponentData(): void {
    this.elementsService
      .getElements()
      .pipe(
        PipeUtils.handleError('Failed to fetch elements data'),
        PipeUtils.handleSuccess('Successfully fetched elements'),
      )
      .subscribe((data) => (this.rowData = data));
  }

  private onManageElement(value: ActionEvent): void {
    DialogUtils.openLargeDialog(ManageElementsComponent, {
      rowData: value.element,
      mode: value.event,
    })
      .afterClosed()
      .pipe(
        filter(Boolean),
        PipeUtils.handleSuccess(`Data ${value.event} Successful`),
      )
      .subscribe((element: PeriodicElement) => {
        const EventToActionMap: Record<string, () => void> = {
          Edit: () =>
            this.updateRowDataAfterEdit(value.element.position, element),
          Add: () => this.updateRowDataAfterAdd(element),
        };

        const action = EventToActionMap[value.event];
        action();
      });
  }

  private updateRowDataAfterEdit(
    position: number,
    element: PeriodicElement,
  ): void {
    this.rowData = this.rowData.map((rowData) => {
      if (rowData.position === position) {
        return element;
      }

      return rowData;
    });
  }

  private updateRowDataAfterAdd(element: PeriodicElement): void {
    this.rowData = [...this.rowData, element];
  }

  private onDelete(value: ActionEvent): void {
    const message =
      'Are you sure? You are about to delete the selected elements data';
    DialogUtils.openLargeDialog(YesNoConfirmationModalComponent, { message })
      .afterClosed()
      .pipe(
        PipeUtils.handleSuccess(
          `Successfully deleted element ${value.element.name}`,
        ),
        filter(Boolean),
      )
      .subscribe(() => {
        this.rowData = this.rowData.filter(
          (data) => data.position !== value.element.position,
        );
      });
  }

  private onPreview(value: ActionEvent): void {
    DialogUtils.openLargeDialog(PreviewElementsComponent, {
      rowData: value.element,
      mode: value.event,
    });
  }
}
