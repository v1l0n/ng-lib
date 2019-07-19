import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private _SUGGESTIONS: Subject<string[]>;

  get suggestions$(): Observable<string[]> {
    return this._SUGGESTIONS.asObservable();
  }

  constructor(private appService: AppService) {
    this._SUGGESTIONS = new Subject();
  }

  ngOnInit() {
  }

  handleQuery = (query: {type: string, text: string}) => {
    console.log(`type: ${query.type} - text: ${query.text}`);

    switch (query.type) {

      case 'search': {
        break;
      }

      case 'suggest': {
        this._SUGGESTIONS.next(['test demo', 'test demo 2']);
        break;
      }
    }
  }
}
