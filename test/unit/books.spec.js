import './setup';
import Promise from 'bluebird';
import {Books} from '../../src/books.js';

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

describe('the Books module', () => {
  it('sets fetch response to books', (done) => {
    var http = new HttpStub();
    var sut = new Books(http);
    var itemStubs = [1];
    var itemFake = [2];

    http.itemStub = itemStubs;
    sut.activate().then(() => {
      expect(sut.books).toBe(itemStubs);
      expect(sut.books).not.toBe(itemFake);
      done();
    });
  });
});
