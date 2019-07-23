import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  suggestions$: Subject<string[]>;
  search: string;
  timerId: any;

  constructor(private appService: AppService) {
    this.suggestions$ = new Subject();
  }

  ngOnInit() {
  }

  handleQuery = (query: {type: string, text: string}) => {
    clearTimeout(this.timerId);

    switch (query.type) {

      case 'search': {
        this.search = query.text;
        this.suggestions$.next([]);
        break;
      }

      case 'suggest': {

        this.timerId = setTimeout(() => {
          if (query.text.length <= 42) {
            this.suggestions$.next([`${query.text} demo`, `${query.text} demo 2`, `${query.text} demo 3`]);
          } else {
            this.suggestions$.next([]);
          }
        }, 500);
        break;
      }
    }
  }
}
