export class PageObjectBooks {

  constructor() {
    this.href = 'http://localhost:3000#/basket';
  }

  getHref() {
    return this.href;
  }

  getIntroductionText() {
    return element(by.css('.books-intro-text')).getText();
  }

  getBasketIconLink() {
    return element(by.css('.basket')).getAttribute('href');
  }

  getBadgeValue() {
    return element(by.css('.basket .badge-custom')).getText();
  }

  getNumberOfBooks() {
    const list = this.getListOfBooks();
    return list.count();
  }

  addBookToBasket(index) {
    const list = this.getListOfBooks();
    return list.get(index).element(by.css('.books-add-item-button')).click();
  }

  removeBookFromBasket(index) {
    const list = this.getListOfBooks();
    return list.get(index).element(by.css('.books-remove-item-button')).click();
  }

  isBadgeDisplayed() {
    return browser.isElementPresent(by.css('.basket .badge-custom'));
  }
  isClearAllDisplayed() {
    return browser.isElementPresent(by.css('.clear-all'));
  }

  getNumberBoughtOfBook(index) {
    var list = this.getListOfBooks();
    return list.get(index).element(by.css('.books-item-number-text span')).getText();
  }

  getListOfBooks() {
    return element.all(by.css('.books-items .card-container'));
  }

  clearBasket() {
    return element(by.css('.clear-all')).click();
  }


}
