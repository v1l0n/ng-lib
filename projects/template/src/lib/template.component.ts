import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-template',
  template: `
    <p>
      template works!
    </p>
  `,
  styles: []
})
export class TemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
