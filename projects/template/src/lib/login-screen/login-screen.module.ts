import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginScreenComponent } from './login-screen.component';

@NgModule({
  declarations: [LoginScreenComponent],
  exports: [LoginScreenComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule, MatInputModule,
    FlexLayoutModule
  ]
})
export class LoginScreenModule { }
