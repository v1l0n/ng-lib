import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _BUFFERING: BehaviorSubject<boolean>;

  constructor() {
    this._BUFFERING = new BehaviorSubject(false);
  }

  get buffering$(): Observable<boolean> {
    return this._BUFFERING.asObservable();
  }

  get buffering(): boolean {
    return this._BUFFERING.getValue();
  }

  showProgressBar = (show = true) => {
    this._BUFFERING.next(show);
  }

  hideProgressBar = (show = true) => {
    this._BUFFERING.next(!show);
  }
}
