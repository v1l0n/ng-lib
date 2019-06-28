import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'vln-login',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit, OnChanges {
  @Input() failed: boolean;
  @Output() login = new EventEmitter<{email: string, password: string}>();
  loginFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginFormGroup = formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loginFormGroup.get('password').valueChanges.pipe(
      distinctUntilChanged()
    )
      .subscribe(() => {
          if (this.loginFormGroup.get('email').errors && this.loginFormGroup.get('email').errors.loginFailed) {
            this.loginFormGroup.get('email').setErrors({ loginFailed: false });
            this.loginFormGroup.updateValueAndValidity();
          }
        });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.failed && changes.failed.currentValue) {
      this.loginFormGroup.get('email').setErrors({ loginFailed: true });
    }
  }

  sendCredentials = () => {
    this.login.emit({
      email: this.loginFormGroup.get('email').value,
      password: this.loginFormGroup.get('password').value
    });
  }
}
