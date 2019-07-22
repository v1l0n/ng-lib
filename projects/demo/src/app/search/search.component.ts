import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  suggestions$: Subject<string[]>;

  constructor(private appService: AppService) {
    this.suggestions$ = new Subject();
  }

  ngOnInit() {
  }

  handleQuery = (query: {type: string, text: string}) => {

    switch (query.type) {

      case 'search': {
        console.log(`search: ${query.text}`);
        break;
      }

      case 'suggest': {
        setTimeout(() => {
          this.suggestions$.next(['test demo', 'test demo 2', query.text]);
        }, 1000);
        break;
      }
    }
  }
}
