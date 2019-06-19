import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  failed: boolean;

  constructor() { }

  ngOnInit() {
  }

  login = (credentials) => {
    console.log(credentials);
  }
}
