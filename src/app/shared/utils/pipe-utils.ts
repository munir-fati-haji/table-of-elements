import { catchError, EMPTY, OperatorFunction, tap } from 'rxjs';
import { NotificationUtils } from './notification-utils';

export class PipeUtils {

  public static handleError<T>(message: string): OperatorFunction<T, T> {
    return catchError(() => {
      NotificationUtils.showErrorNotification(message);

      return EMPTY;
    });
  }

  public static handleSuccess<T>(message: string): OperatorFunction<T, T> {
    return tap(() => NotificationUtils.showSucessNotification(message));
  }
}
