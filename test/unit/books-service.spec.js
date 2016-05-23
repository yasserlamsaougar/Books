import './setup';
import Promise from 'bluebird';
import {BooksService} from '../../src/books-service.js';

class HttpStub {
  fetch(url) {
    var response = this.itemStub;
    this.url = url;
    return new Promise((resolve) => {
      resolve({ json: () => response });
    });
  }

  configure(func) {
  }
}

describe('the Books Service module', () => {
  it('sets fetch response to books', (done) => {
    var http = new HttpStub();
    var sut = new BooksService(http);
    var itemStubs = [1];
    var itemFake = [2];

    http.itemStub = itemStubs;
    sut.getBooks().then((books) => {
      expect(books).toBe(itemStubs);
      expect(books).not.toBe(itemFake);
      done();
    });
  });
});
