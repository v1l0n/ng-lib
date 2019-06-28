import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _BUFFERING: BehaviorSubject<boolean>;

  get buffering$(): Observable<boolean> {
    return this._BUFFERING.asObservable();
  }

  get buffering(): boolean {
    return this._BUFFERING.getValue();
  }

  constructor() {
    this._BUFFERING = new BehaviorSubject(false);
  }

  showProgressBar = (show = true) => {
    this._BUFFERING.next(show);
  }

  hideProgressBar = (show = true) => {
    this._BUFFERING.next(!show);
  }
}
