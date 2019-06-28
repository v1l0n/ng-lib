import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _FAILED: BehaviorSubject<boolean>;

  get failed$(): Observable<boolean> {
    return this._FAILED.asObservable();
  }

  constructor(private router: Router,
              private appService: AppService) {
    this._FAILED = new BehaviorSubject(false);
  }

  ngOnInit() {
  }

  login = (credentials) => {
    this.appService.showProgressBar();

    setTimeout(() => {
      this.appService.hideProgressBar();

      if (credentials.email === 'test@test.com') {
        this._FAILED.next(true);
      } else {
        this.router.navigate(['']);
      }
    }, 1000);
  }
}
