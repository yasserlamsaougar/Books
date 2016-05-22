import {PageObjectBooks} from './books.po.js';
import {PageObjectSkeleton} from './skeleton.po.js';

describe('aurelia skeleton app', function() {
  let poBooks;
  let poSkeleton;

  beforeEach(() => {
    poSkeleton = new PageObjectSkeleton();
    poBooks = new PageObjectBooks();

    browser.loadAndWaitForAureliaPage(poBooks.getHref());
  });

  it('should load the page and display the initial page title', () => {
    expect(poSkeleton.getCurrentPageTitle()).toBe('Welcome | Aurelia');
  });

  it('should display introduction text', () => {
    const introductionText = '';
    expect(poBooks.getIntroductionText()).toBe(introductionText);
  });

  it('should have an empty basket', () => {
    const numberOfItemsBought = poBooks.getBadgeValue();
    expect(numberOfItemsBought).toEqual("0");

  });

  it('should have five books shown', () => {
    const numberOfBooks = poBooks.getNumberOfBooks();
    expect(numberOfBooks).toBe(5);
  });

  it('should add a book to the basket', () => {
    poBooks.addBookToBasket(0);
    const numberOfItemsBought = poBooks.getBadgeValue();
    expect(numberOfItemsBought).toEqual("1");
    const numberBoughtOfBook = poBooks.getNumberBoughtOfBook(0);
    expect(numberBoughtOfBook).toEqual("1");
  });

  it('should remove the added book from the basket', () => {
    poBooks.removeBookFromBasket(0);
    const numberOfItemsBought = poBooks.getBadgeValue();
    expect(numberOfItemsBought).toEqual("0");
    const numberBoughtOfBook = poBooks.getNumberBoughtOfBook(0);
    expect(numberBoughtOfBook).toEqual("0");
  });

  it('should not be able to remove the same book from the basket', () => {
    poBooks.removeBookFromBasket(0);
    const numberOfItemsBought = poBooks.getBadgeValue();
    const NumberBoughtOfBook = poBooks.getNumberBoughtOfBook(0);
    expect(numberOfItemsBought).toEqual("0");
    const numberBoughtOfBook = poBooks.getNumberBoughtOfBook(0);
    expect(numberBoughtOfBook).toEqual("0");
  });

  it('should not be able to navigate to basket page', () => {
    poSkeleton.navigateTo('#/basket');
    expect(poSkeleton.getCurrentPageTitle()).toBe('Books Page');
  });

  it('should add a book 2 times to the basket', () => {
    poBooks.addBookToBasket(0);
    const numberOfItemsBought = poBooks.getBadgeValue();
    expect(numberOfItemsBought).toEqual("1");
    const numberBoughtOfBook = poBooks.getNumberBoughtOfBook(0);
    expect(numberBoughtOfBook).toEqual("1");
    poBooks.addBookToBasket(0);
    const numberOfItemsBought = poBooks.getBadgeValue();
    expect(numberOfItemsBought).toEqual("2");
    const numberBoughtOfBook = poBooks.getNumberBoughtOfBook(0);
    expect(numberBoughtOfBook).toEqual("2");
  });


  it('should be able to navigate to basket page', () => {
    poSkeleton.navigateTo('#/basket');
    expect(poSkeleton.getCurrentPageTitle()).toBe('Books Basket');
  });

});
