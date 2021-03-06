import {
  CoreNotFoundException,
  CoreUnauthorizedFoundException
} from '@pimp-my-pr/server/shared/domain';
import { AxiosError } from 'axios';
import { OperatorFunction, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function catchRequestExceptions(): OperatorFunction<any, any> {
  return source$ =>
    source$.pipe(
      catchError((err: AxiosError) => {
        switch (err.response.status) {
          case 401:
            return throwError(new CoreUnauthorizedFoundException());
          case 404:
            return throwError(new CoreNotFoundException());
          default:
            return throwError(err);
        }
      })
    );
}
