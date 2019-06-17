import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginScreenComponent } from './login-screen.component';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';

describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginScreenComponent ],
      imports: [FormsModule, ReactiveFormsModule]
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
      component.loginFormGroup.controls.email.setValue('bad email');
      expect(component.loginFormGroup.controls.email.errors.email).toBeTruthy();
    });
  });

  describe('Password form control', () => {

    it('should create', () => {
      expect(component.loginFormGroup.controls.password).toBeTruthy();
    });
  });
});
