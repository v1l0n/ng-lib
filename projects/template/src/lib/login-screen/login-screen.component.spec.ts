import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginScreenComponent } from './login-screen.component';

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

  it('should filter inputs', () => {
    const originalComponent = component;
    component.ngOnChanges({wrongInput: new SimpleChange(null, true, true)});
    fixture.detectChanges();
    expect(component).toEqual(originalComponent);
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

    it('should be on error when login failed', () => {
      component.ngOnChanges({failed: new SimpleChange(null, true, true)});
      fixture.detectChanges();
      expect(component.loginFormGroup.controls.email.errors.loginFailed).toBeTruthy();
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

    it('should reset \'loginFailed\' error on new input', () => {
      component.loginFormGroup.get('email').setErrors({loginFailed: true});
      component.loginFormGroup.get('password').setValue(correctPassword);
      expect(component.loginFormGroup.controls.email.errors.loginFailed).toBeFalsy();
    });
  });
});
