import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result.component';
import { MatListModule } from '@angular/material';

@NgModule({
  declarations: [SearchResultComponent],
  exports: [SearchResultComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatListModule
  ]
})
export class SearchResultModule { }
