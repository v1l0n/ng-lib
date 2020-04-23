import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'vln-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() set results(results: {title: string, link: string}[]) {
    this.results$.next(results);
  }

  results$: Subject<{title: string, link: string}[]> = new Subject();

  constructor() { }

  ngOnInit() {
  }

}
