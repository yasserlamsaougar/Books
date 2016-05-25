import './setup';
import Promise from 'bluebird';
import {Books} from '../../src/books.js';
import {BasketService} from '../../src/basket-service.js'

class BooksServiceStub {

  getBooks() {
    let books = [{
      title: 'Test Book',
      price: 30,
      isbn: 'testisbn1'
    }, {
      title: 'Test Book 2',
      price: 35,
      isbn: 'testisbn2'
    }];
    return new Promise((resolve) => {
       resolve(books);
    });
  }

  configure(func) {

  }
}

describe('the Books module setup', () => {
  it('sets fetch response to books', (done) => {
    const bookService = new BooksServiceStub();
    const basketService = new BasketService();
    const sut = new Books(bookService, basketService);
    const itemStubs = [{
      title: 'Test Book',
      price: 30,
      isbn: 'testisbn1'
    }, {
      title: 'Test Book 2',
      price: 35,
      isbn: 'testisbn2'
    }];
    const itemFake = [2];
    spyOn(basketService, 'syncNewCollection');
    expect(sut.boughtArticlesNumber).toEqual(0);
    sut.activate().then((books) => {
      expect(books).toEqual(itemStubs);
      expect(books).not.toEqual(itemFake);
      expect(basketService.syncNewCollection).toHaveBeenCalledWith(books);
      done();
    });
  });

});

describe('The books module behavior', () => {

  let books, basketService;
  let bookCollection = [];

  beforeEach(() => {
    bookCollection = [
      {
        title: 'test 1',
        price: 30,
        isbn: 'testisbn1'
      },
      {
        title: 'test 2',
        price: 35,
        isbn: 'testisbn2'
      },
      {
        title: 'test 3',
        price: 40,
        isbn: 'testisbn3'
      }
    ];
    spyOn(sessionStorage, 'setItem').and.returnValue(true);
    spyOn(sessionStorage, 'getItem').and.returnValue([]);
    basketService = new BasketService();
    var bookService = new BooksServiceStub();
    books = new Books(bookService, basketService);
    books.activate();
  });

  it('should add items to the basket', () => {
    books.addArticle(bookCollection[0]);

    expect(books.boughtArticlesNumber).toEqual(1);

    books.addArticle(bookCollection[0]);
    expect(books.boughtArticlesNumber).toEqual(2);

  });

  it('should remove items from the basket', () => {
    books.addArticle(bookCollection[0]);
    books.addArticle(bookCollection[0]);

    books.removeArticle(bookCollection[0]);
    expect(books.boughtArticlesNumber).toEqual(1);
    books.removeArticle(bookCollection[0]);
    expect(books.boughtArticlesNumber).toEqual(0);
    books.removeArticle(bookCollection[0]);
    expect(books.boughtArticlesNumber).toEqual(0);
  });



  it('should clear all items in the basket', () => {
    books.addArticle(bookCollection[0]);
    books.addArticle(bookCollection[1]);

    books.clearAllArticles();
    expect(books.boughtArticlesNumber).toEqual(0);

    [bookCollection[0], bookCollection[1]].forEach((book) => {
      expect(book.numberBought).toEqual(0);
    });

  });

});
