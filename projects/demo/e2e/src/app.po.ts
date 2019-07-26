import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getToolbarTitleText() {
    return element(by.css('app-root mat-sidenav-container mat-sidenav-content mat-toolbar span.title')).getText() as Promise<string>;
  }
}
