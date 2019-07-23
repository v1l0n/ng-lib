import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../app.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tiles: {title: string, link: string, icon: string}[];
  isHandset$: Observable<boolean> ;

  constructor(private breakpointObserver: BreakpointObserver,
              private appService: AppService) {

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches)
    );

    this.tiles = appService.navigationItems.filter(item => item.title !== 'home');
  }
}
