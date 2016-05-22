export class PageObjectSkeleton {

  constructor() {

  }

  getCurrentPageTitle() {
    return browser.getTitle();
  }

  getCurrentUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo(href) {
    element(by.css('a[href="' + href + '"]')).click();
    return browser.waitForRouterComplete();
  }
}
