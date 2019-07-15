import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'vln-search',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() query = new EventEmitter<string>();
  searchFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchFormGroup = formBuilder.group({
      query: [null]
    });
  }

  ngOnInit() {
  }

  onEnter = (query) => {
    this.query.emit(query);
  }
}
