import {PageObjectBooks} from './books.po.js';


import {PageObjectSkeleton} from './skeleton.po.js';

describe('aurelia skeleton app', function () {
  let poBooks;
  let poSkeleton;

  beforeEach(() => {
    poSkeleton = new PageObjectSkeleton();
    poBooks = new PageObjectBooks();

    browser.loadAndWaitForAureliaPage(poBooks.getHref());
  });

  it('should load the page and display the initial page title', () => {
    expect(poSkeleton.getCurrentPageTitle()).toBe('Books Page | ReadMore');
  });

  it('should have five books shown', () => {
    const numberOfBooks = poBooks.getNumberOfBooks();
    expect(numberOfBooks).toBe(7);
  });

  it('should add a book to the basket', () => {
    poBooks.addBookToBasket(0);
    let numberBoughtOfBook = poBooks.getNumberBoughtOfBook(0);
    let numberOfItemsBought = poBooks.getBadgeValue();
    expect(numberOfItemsBought).toEqual("1");
    expect(numberBoughtOfBook).toEqual("1");
  });

  it('should remove the added book from the basket', () => {
    poBooks.removeBookFromBasket(0);
    let numberBoughtOfBook = poBooks.getNumberBoughtOfBook(0);
    expect(numberBoughtOfBook).toEqual("0");
    expect(poBooks.isBadgeDisplayed()).toBeFalsy();
  });

  it('should not be able to remove the same book from the basket', () => {
    poBooks.removeBookFromBasket(0);
    expect(poBooks.isBadgeDisplayed()).toBeFalsy();
    let numberBoughtOfBook = poBooks.getNumberBoughtOfBook(0);
    expect(numberBoughtOfBook).toEqual("0");
  });

  it('should not be able to navigate to basket page', () => {
    expect(poBooks.isBadgeDisplayed()).toBeFalsy();
  });

  it('should add a book 2 times to the basket', () => {
    poBooks.addBookToBasket(0);

    let numberBoughtOfBook = poBooks.getNumberBoughtOfBook(0);
    expect(numberBoughtOfBook).toEqual("1");

    poBooks.addBookToBasket(0);

    numberBoughtOfBook = poBooks.getNumberBoughtOfBook(0);
    expect(numberBoughtOfBook).toEqual("2");

    expect(poBooks.isBadgeDisplayed()).toBeTruthy();
  });


  it('should be able to navigate to basket page', () => {
    expect(poBooks.getBasketIconLink()).toMatch(/#\/basket$/);
  });

  it('should clear all results', () => {
    poBooks.clearBasket();
    for(let i = 0; i < 7; ++i) {
      let numberBoughtOfBook = poBooks.getNumberBoughtOfBook(0);
      expect(numberBoughtOfBook).toEqual("0");
    }
    expect(poBooks.isBadgeDisplayed()).toBeFalsy();
    expect(poBooks.isClearAllDisplayed()).toBeFalsy();

  });

});
