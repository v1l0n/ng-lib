import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { distinctUntilChanged, delay, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'vln-search',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() suggestions$: Observable<string[]>;
  @Output() query = new EventEmitter<{type: string, text: string}>();

  searchFormGroup: FormGroup;
  autocompleteOptions$: Observable<string[]>;

  constructor(private formBuilder: FormBuilder) {
    this.searchFormGroup = formBuilder.group({
      query: [null]
    });
  }

  ngOnInit() {
    this.searchFormGroup.get('query').valueChanges.pipe(
      delay(200),
      distinctUntilChanged()
    ).subscribe(query => {
      this.query.emit({type: 'suggest', text: query});
    });

    this.autocompleteOptions$ = this.suggestions$.pipe(
      startWith([])
    );
  }

  emitQuery = (query) => {
    this.query.emit({type: 'search', text: query});
  }
}
