import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  failed$: Subject<boolean>;

  constructor(private router: Router,
              private appService: AppService) {
    this.failed$ = new Subject();
  }

  ngOnInit() {
  }

  login = (credentials) => {
    this.appService.showProgressBar();

    setTimeout(() => {
      this.appService.hideProgressBar();

      if (credentials.email === 'test@test.com') {
        this.failed$.next(true);
      } else {
        this.router.navigate(['']);
      }
    }, 1000);
  }
}
