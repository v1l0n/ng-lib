import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { distinctUntilChanged, delay } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'vln-search',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Input() set suggestions(suggestions: string[]) {
    this.suggestions$.next(suggestions);
  }

  @Output() query = new EventEmitter<{type: string, text: string}>();

  searchFormGroup: FormGroup;
  suggestions$: Subject<string[]> = new Subject();

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
  }

  emitQuery = (query) => {
    this.query.emit({type: 'search', text: query});
  }
}
