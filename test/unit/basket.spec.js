import './setup';
import Promise from 'bluebird';
import {Basket} from '../../src/basket.js';
import {BasketService} from '../../src/basket-service.js'
import {OfferCalculator} from '../../src/offer-calculator.js'
class OfferServiceStub {
  offers =
  {
    offers: [
      {
        type: 'percentage', // 137.75
        value: 5
      },
      {
        type: 'minus', // 40
        value: 15
      },
      {
        type: 'slice',
        sliceValue: 100, // 65
        value: 12
      }
    ]
  };
  getOffers(isbns) {
    return new Promise((resolve) => {
      resolve(this.offers);
    });
  }

  configure(func) {

  }
}

describe('the Basket module setup', () => {
  let booksCollection = [];
  beforeEach(() => {
    spyOn(sessionStorage, 'setItem').and.returnValue(true);
    spyOn(sessionStorage, 'getItem').and.returnValue([]);
    booksCollection = [{
      title: 'Test Book',
      price: 30,
      isbn: 'testisbn1'
    }, {
      title: 'Test Book 2',
      price: 35,
      isbn: 'testisbn2'
    }];
  });

  it('should do nothing if the basket is empty', (done) => {

    const offerService = new OfferServiceStub([]);
    spyOn(offerService, 'getOffers');
    let basketService = new BasketService(new OfferCalculator());
    const sut = new Basket(offerService, basketService);

    const result = sut.activate();
    expect(result).toBeUndefined();
    expect(offerService.getOffers.calls.any()).toBeFalsy();
    done();

  });
  it('sets fetch response to books', (done) => {

    const offerService = new OfferServiceStub();
    let basketService = new BasketService(new OfferCalculator());
    const sut = new Basket(offerService, basketService);
    const itemStubs =
    {
      offers: [
        {
          type: 'percentage', // 137.75
          value: 5
        },
        {
          type: 'minus', // 130
          value: 15
        },
        {
          type: 'slice',
          sliceValue: 100, // 133
          value: 12
        }
      ]
    };
    basketService.addArticle(booksCollection[0]);

    const itemFake = [2];
    sut.activate().then((offers) => {
      expect(offers).toEqual(itemStubs);
      expect(offers).not.toEqual(itemFake);
      expect(sut.offers).toEqual(itemStubs);
      done();
    });
  });

  it('should initialize the basket items and price based on the basket service', (done) => {
    const offerService = new OfferServiceStub();
    const basketService = new BasketService(new OfferCalculator());

    basketService.addArticle(booksCollection[0]);
    basketService.addArticle(booksCollection[1]);
    const sut = new Basket(offerService, basketService);
    sut.activate().then(() => {
      expect(sut.articles).toEqual(basketService.articles);
      expect(sut.currentPriceWithOffers).toEqual(50);
      expect(sut.currentPrice).toEqual(65);
      done();
    });
  });

  it('should call the offer service with the list of books in the basket', (done) => {
    const offerService = new OfferServiceStub();
    spyOn(offerService, 'getOffers').and.callThrough();
    let basketService = new BasketService(new OfferCalculator());
    basketService.addArticle(booksCollection[0]);
    basketService.addArticle(booksCollection[1]);
    const sut = new Basket(offerService, basketService);
    sut.activate().then(() => {
      expect(sut.articles).toEqual(basketService.articles);
      expect(offerService.getOffers).toHaveBeenCalledWith(basketService.articles);
      done();
    });

  });

});

describe('The basket module behavior', () => {

  let basket, basketService, baseNumberOfItems;
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
    baseNumberOfItems = bookCollection.length;
    basketService = new BasketService(new OfferCalculator());
    bookCollection.forEach((element) => {
      basketService.addArticle(element);
    });
    const offerService = new OfferServiceStub();
    basket = new Basket(offerService, basketService);
  });

  it('should be able to add more items to the basket',  (done) => {
    basket.activate().then(() => {
      basket.addArticle(bookCollection[0]);
      expect(bookCollection[0].numberBought).toEqual(2);
      expect(basket.totalArticles).toEqual(baseNumberOfItems + 1);
      done();
    });
  });


  it('should be able to remove items from the basket', (done) => {
    basket.activate().then(() => {
      basket.removeArticle(bookCollection[1]);
      expect(bookCollection[1].numberBought).toEqual(0);
      expect(basket.totalArticles).toEqual(baseNumberOfItems - 1);
      done();
    });
  });

  it('should be able to remove all items at once', (done) => {
    basket.activate().then(() => {
      basket.addArticle(bookCollection[0]);
      basket.addArticle(bookCollection[1]);
      basket.addArticle(bookCollection[2]);
      basket.clearAllArticles();
      expect(basket.totalArticles).toEqual(0);
      done();
    });
  });

});
