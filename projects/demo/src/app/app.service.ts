import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  buffering$: Subject<boolean>;

  constructor() {
    this.buffering$ = new Subject();
  }

  showProgressBar = (show = true) => {
    this.buffering$.next(show);
  }

  hideProgressBar = (show = true) => {
    this.buffering$.next(!show);
  }
}
