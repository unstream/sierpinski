import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getIterationInput() {
    return element(by.id('iterations'));
    //return element(by.css('app-root h1')).getText();
  }
}

