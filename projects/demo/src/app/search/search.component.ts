import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  suggestions$: Subject<string[]> = new Subject();
  results$: Subject<{title: string, link: string, description?: string}[]> = new Subject();
  timerId: any;

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  handleQuery = (query: {type: string, text: string}) => {

    switch (query.type) {

      case 'search': {
        clearTimeout(this.timerId);
        this.suggestions$.next([]);
        this.results$.next([
          {title: `${query.text} result`, link: `https://www.google.be/search?q=${encodeURIComponent(query.text)}`},
          {title: `${query.text} result 2`, link: `https://www.google.be/search?q=${encodeURIComponent(query.text)}`},
          {title: `${query.text} result 3`, link: `https://www.google.be/search?q=${encodeURIComponent(query.text)}`},
          {title: `${query.text} result 4`, link: `https://www.google.be/search?q=${encodeURIComponent(query.text)}`},
          {title: `${query.text} result 5`, link: `https://www.google.be/search?q=${encodeURIComponent(query.text)}`},
        ]);
        break;
      }

      case 'suggest': {
        clearTimeout(this.timerId);

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
