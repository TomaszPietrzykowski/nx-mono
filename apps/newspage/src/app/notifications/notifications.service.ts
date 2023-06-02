import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

interface Notification {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}

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
    this.notificationsInput.next({
      id: this._generateRandomNumber(),
      type: 'success',
      text: message,
    });
  }

  addError(message: string) {
    this.notificationsInput.next({
      id: this._generateRandomNumber(),
      type: 'error',
      text: message,
    });
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
