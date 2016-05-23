import './setup';
import Promise from 'bluebird';
import {OfferService} from '../../src/offer-service.js';

// TODO : EXTERNALIZE THIS CLASS
class HttpStub {
  fetch(url) {
    var response = this.itemStub;
    this.url = url;
    return new Promise((resolve) => {
      resolve({json: () => response});
    });
  }

  configure(func) {
  }
}

describe('the Offer service module', () => {
  it('sets fetch response to offers', (done) => {
    var http = new HttpStub();
    var sut = new OfferService(http);
    var itemStubs = [1];
    var itemFake = [2];
    const isbns = ['test1', 'test2'];

    http.itemStub = itemStubs;
    sut.getOffers(isbns).then((offers) => {
      expect(offers).toBe(itemStubs);
      expect(offers).not.toBe(itemFake);
      done();
    });

    spyOn(http, 'fetch').and.returnValue({
      then: () => {
      }
    });
    sut.getOffers(isbns);

    expect(http.fetch).toHaveBeenCalledWith(`books/${isbns[0]},${isbns[1]}/commercialOffers`);

  });
});
