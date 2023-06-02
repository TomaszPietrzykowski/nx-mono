import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { Notification } from '@nx-mono/model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notificationsInput: Subject<Notification>;
  notificationsOutput: Observable<Array<Notification>>;
  // using 2 different properties to handle notifications since we need Subject to be able to call next from outside
  // and pass a value (emit notification); on the other hand chaining .pipe() returns a new Observable which we take as an output
  constructor() {
    this.notificationsInput = new Subject<Notification>();
    this.notificationsOutput = this.notificationsInput.pipe(
      scan((acc: Notification[], value) => {
        if (value.type === 'clear') {
          return acc.filter((command) => command.id != value.id);
        } else {
          return [...acc, value];
        }
      }, [])
    );
  }

  addSuccess(message: string) {
    const id = this._generateRandomNumber();

    this.notificationsInput.next({
      id,
      type: 'success',
      text: message,
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  addError(message: string) {
    const id = this._generateRandomNumber();

    this.notificationsInput.next({
      id,
      type: 'error',
      text: message,
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  clearMessage(id: number) {
    this.notificationsInput.next({
      id,
      type: 'clear',
    });
  }

  private _generateRandomNumber(): number {
    return Math.round(Math.random() * 10000);
  }
}
