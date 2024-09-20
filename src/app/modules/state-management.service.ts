import { inject, Injectable, signal } from '@angular/core';
import { PeriodicElement } from './elements/models/periodic-element';
import { TableAction } from '../shared/models/table-action';
import { DialogUtils } from '../shared/utils/dialog-utils';
import { ManageElementsComponent } from './elements/modals/manage-elements/manage-elements.component';
import {filter, tap} from 'rxjs';
import { PipeUtils } from '../shared/utils/pipe-utils';
import { ActionEvent } from './elements/elements.component';
import { YesNoConfirmationModalComponent } from '../shared/components/yes-no-confirmation-modal/yes-no-confirmation-modal.component';
import { PreviewElementsComponent } from './elements/modals/preview-elements/preview-elements.component';
import { ElementsService } from './elements/services/elements.service';

const ACTION_LIST: TableAction[] = [
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

@Injectable({
  providedIn: 'root',
})
export class StateManagementService {
  public actionList: TableAction[] = ACTION_LIST;
  public rowData = signal<PeriodicElement[]>([]);
  private elementsService = inject(ElementsService);

  public addElement(): void {
    const element = {} as PeriodicElement;
    const event = 'Add';
    this.onManageElement({ element, event });
  }

  public onActionClick(value: ActionEvent): void {
    const EventToActionClickMap: Record<string, () => void> = {
      Edit: () => this.onManageElement(value),
      Delete: () => this.onDelete(value),
      Preview: () => this.onPreview(value),
    };
    const action = EventToActionClickMap[value.event];
    action();
  }

  public onManageElement(value: ActionEvent): void {
    const data = {
      rowData: value.element,
      mode: value.event,
    };
    DialogUtils.openLargeDialog(ManageElementsComponent, data)
      .afterClosed()
      .pipe(
        filter(Boolean),
        PipeUtils.handleSuccess(`Data ${value.event} Successful`),
        tap((element) => this.manageElements(element as PeriodicElement, value))
      )
      .subscribe();
  }

  public initiateComponentData(): void {
    this.elementsService
      .getElements()
      .pipe(
        PipeUtils.handleError('Failed to fetch elements data'),
        PipeUtils.handleSuccess('Successfully fetched elements'),
        tap((data) => this.rowData.set(data))
      )
      .subscribe();
  }

  public updateRowDataAfterEdit(
    position: number,
    element: PeriodicElement,
  ): void {
    this.rowData.set(
      this.rowData().map((rowData) => {
        if (rowData.position === position) {
          return element;
        }

        return rowData;
      }),
    );
  }

  private manageElements(element: PeriodicElement, value: ActionEvent): void {
    const EventToActionMap: Record<string, () => void> = {
      Edit: () => this.updateRowDataAfterEdit(value.element.position, element),
      Add: () => this.updateRowDataAfterAdd(element),
    };

    const action = EventToActionMap[value.event];
    action();
  }

  private updateRowDataAfterAdd(element: PeriodicElement): void {
    this.rowData.set([...this.rowData(), element]);
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
        PipeUtils.handleError('Failed to delete the selected element'),
        tap(() => this.deleteRowData(value.element.position))
      )
      .subscribe();
  }

  private deleteRowData(position: number): void {
    this.rowData.set(
      this.rowData().filter(
        (data) => data.position !== position,
      ),
    );
  }

  private onPreview(value: ActionEvent): void {
    DialogUtils.openLargeDialog(PreviewElementsComponent, {
      rowData: value.element,
      mode: value.event,
    });
  }
}
