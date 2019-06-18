import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginScreenComponent } from './login-screen.component';
import { SimpleChange } from '@angular/core';

describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;

  const correctEmail = 'test@vln.be';
  const incorrectEmail = 'not an email';
  const correctPassword = 'test';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginScreenComponent ],
      imports: [
        FormsModule, ReactiveFormsModule,
        MatButtonModule, MatInputModule,
        FlexLayoutModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Login form', () => {

    it('should create', () => {
      expect(component.loginFormGroup).toBeTruthy();
    });

    it('should enable submit button if valid', () => {
      component.loginFormGroup.get('email').setValue(correctEmail);
      component.loginFormGroup.get('password').setValue(correctPassword);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('button')).nativeElement.getAttribute('disabled')).toBeFalsy();
    });

    it('should emit credential on submit', () => {
      spyOn(component.login, 'emit');
      component.loginFormGroup.get('email').setValue(correctEmail);
      component.loginFormGroup.get('password').setValue(correctPassword);
      fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
      fixture.detectChanges();
      expect(component.login.emit).toHaveBeenCalledWith({email: correctEmail, password: correctPassword});
    });

    it('should be on error when login failed', () => {
      component.ngOnChanges({failed: new SimpleChange(null, true, true)});
      fixture.detectChanges();
      expect(component.loginFormGroup.errors.loginFailed).toBeTruthy();
    });
  });

  describe('Email form control', () => {

    it('should create', () => {
      expect(component.loginFormGroup.controls.email).toBeTruthy();
    });

    it('should be required', () => {
      const validator = component.loginFormGroup.controls.email.validator({} as AbstractControl);
      expect(validator.required).toBeTruthy();
    });

    it('should be an email', () => {
      component.loginFormGroup.get('email').setValue(incorrectEmail);
      expect(component.loginFormGroup.controls.email.errors.email).toBeTruthy();
    });
  });

  describe('Password form control', () => {

    it('should create', () => {
      expect(component.loginFormGroup.controls.password).toBeTruthy();
    });

    it('should be required', () => {
      const validator = component.loginFormGroup.controls.password.validator({} as AbstractControl);
      expect(validator.required).toBeTruthy();
    });
  });
});
