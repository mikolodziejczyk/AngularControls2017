import { AppPage } from './app.po';
import { browser, element, by } from 'protractor';

// describe('another-app App', () => {
//   let page: AppPage;

//   beforeEach(() => {
//     page = new AppPage();
//   });

//   it('should display welcome message', () => {
//     page.navigateTo();
//     expect(page.getParagraphText()).toEqual('Welcome to app!');
//   });
// });

describe('AnotherApp tests', () => {

  it("Title should be AnotherApp", () => {
    browser.get('/');

    expect(browser.getTitle()).toEqual('AnotherApp');
  })


  it("Click should work", () => {
    browser.get('/');

    element(by.name("secondNumber")).sendKeys(123);
    expect(element(by.name('secondNumber')).getAttribute('value')).toEqual("123");
    element(by.id("setValue")).click();
    expect(element(by.name('secondNumber')).getAttribute('value')).toEqual("");
  })
});