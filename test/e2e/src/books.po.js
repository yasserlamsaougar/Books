export class PageObjectBooks {
  href = 'http://localhost:3000/books';

  getHref() {
    return href;
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
    const list = getListOfBooks();
    return list.count();
  }

  addBookToBasket(index) {
    const list = getListOfBooks();
    list.get(index).element(by.css('.books-add-item-button')).click();
  }

  removeBookFromBasket(index) {
    const list = getListOfBooks();
    list.get(index).element(by.css('.books-remove-item-button')).click();
  }

  getNumberBoughtOfBook(index) {
    var list = getListOfBooks();
    list.get(index).element(by.css('.books-item-number-text span')).getText();
  }

  static function getListOfBooks() {
    return element.all(by.css('.books-items .card-container'));
  }



}
