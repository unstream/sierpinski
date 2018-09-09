import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getIterationInput() {
//    return element(by.css('iterations'));
    return element(by.css('app-fractal input'));
    //return element(by.css('app-root h1')).getText();
  }
}

