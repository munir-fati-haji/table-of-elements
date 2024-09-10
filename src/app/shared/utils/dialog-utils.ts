import { ComponentType } from '@angular/cdk/portal';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

const SMALL_WIDTH = '50%';
const MEDIUM_WIDTH = '70%';
const LARGE_WIDTH = '90%';

const SMALL_HEIGHT = '50%';
const MEDIUM_HEIGHT = '70%';
const LARGE_HEIGHT = '90%';

export class DialogUtils {
  public static matDialog: MatDialog;

  public static openDialog<T>(
    component: ComponentType<T>,
    data: Record<string, unknown>,
    width?: string,
    height?: string,
  ): MatDialogRef<T> {
    return this.matDialog.open(component, {
      width,
      height,
      data,
      disableClose: true,
    });
  }

  public static openSmallDialog<T>(
    component: ComponentType<T>,
    data: Record<string, unknown>,
  ): MatDialogRef<T> {
    return this.openDialog(component, data, SMALL_WIDTH, SMALL_HEIGHT);
  }

  public static openMediumDialog<T>(
    component: ComponentType<T>,
    data: Record<string, unknown>,
  ): MatDialogRef<T> {
    return this.openDialog(component, data, MEDIUM_WIDTH, MEDIUM_HEIGHT);
  }

  public static openLargeDialog<T>(
    component: ComponentType<T>,
    data: Record<string, unknown>,
  ): MatDialogRef<T> {
    return this.openDialog(component, data, LARGE_WIDTH, LARGE_HEIGHT);
  }
}

export function provideDialogInitializer(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: (matDialog: MatDialog) => () => {
      DialogUtils.matDialog = matDialog;
    },
    deps: [MatDialog],
    multi: true,
  };
}
