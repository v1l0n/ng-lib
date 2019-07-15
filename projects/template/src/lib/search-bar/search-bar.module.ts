import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchBarComponent } from './search-bar.component';

@NgModule({
  declarations: [SearchBarComponent],
  exports: [SearchBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule, MatInputModule,
    FlexLayoutModule  ]
})
export class SearchBarModule { }
