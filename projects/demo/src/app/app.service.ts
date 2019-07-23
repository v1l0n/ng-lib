import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _BUFFERING: BehaviorSubject<boolean>;

  get navigationItems(): { title: string, link: string, icon: string}[] {
    return [
      { title: 'home', link: '/', icon: 'home'},
      { title: 'login screen', link: '/login', icon: 'input'},
      { title: 'search bar', link: '/search', icon: 'search'}
    ];
  }

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
