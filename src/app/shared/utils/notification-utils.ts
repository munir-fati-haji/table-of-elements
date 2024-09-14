import { APP_INITIALIZER, Provider } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class NotificationUtils {
  public static snackBar: MatSnackBar;

  public static showSuccessNotification(message: string): void {
    this.openNotification(message, 'success-snackbar');
  }

  public static showWarningNotification(message: string): void {
    this.openNotification(message, 'warning-snackbar');
  }

  public static showInfoNotification(message: string): void {
    this.openNotification(message, 'info-snackbar');
  }

  public static showErrorNotification(message: string): void {
    this.openNotification(message, 'error-snackbar');
  }

  private static openNotification(message: string, panelClass: string): void {
    this.snackBar.open(message, '✖', {
      duration: 5000,
      panelClass,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}

export function provideNotificationInitializer(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: (snackBar: MatSnackBar) => () => {
      NotificationUtils.snackBar = snackBar;
    },
    deps: [MatSnackBar],
    multi: true,
  };
}
