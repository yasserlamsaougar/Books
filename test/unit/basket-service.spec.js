import './setup';
import {BasketService} from '../../src/basket-service.js';
import {OfferCalculator} from '../../src/offer-calculator.js';

describe('The basket service', () => {
  let basketService;
  let bookCollection = [];
  beforeEach(() => {
    const offerCalculator = new OfferCalculator();
    basketService = new BasketService(offerCalculator);
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
  });

  it('should add items to the basket if they are defined', () => {
    basketService.addArticle(bookCollection[1]);
    expect(basketService.articlesLength).toEqual(1);
    basketService.addArticle();
    expect(basketService.articlesLength).toEqual(1);
  });

  it('should not add duplicate items to the basket', () => {
    basketService.addArticle(bookCollection[2]);
    expect(basketService.articlesLength).toEqual(1);
    basketService.addArticle(bookCollection[2]);
    expect(basketService.articlesLength).toEqual(2);
  });
  it('should increment the boughtItems property when 2 items with same isbn', () => {
    basketService.addArticle(bookCollection[2]);
    expect(bookCollection[2].numberBought).toEqual(1);
    basketService.addArticle(bookCollection[2]);
    expect(bookCollection[2].numberBought).toEqual(2);
  });

  it('should decrement the boughtItems property when we remove same item', () => {
    basketService.addArticle(bookCollection[2]);
    basketService.addArticle(bookCollection[2]);

    basketService.removeArticle(bookCollection[2]);
    expect(basketService.articles.length).toEqual(1);
    expect(bookCollection[2].numberBought).toEqual(1);
    basketService.removeArticle(bookCollection[2]);
    expect(bookCollection[2].numberBought).toEqual(0);
    expect(basketService.articles.length).toEqual(0);
    basketService.removeArticle(bookCollection[2]);
    expect(basketService.articles.length).toEqual(0);

  });

  it('should calculate the total price of all the articles in the basket', () => {

    basketService.addArticle(bookCollection[2]);
    basketService.addArticle(bookCollection[2]);
    basketService.addArticle(bookCollection[1]);
    basketService.addArticle(bookCollection[0]);

    expect(basketService.getTotalPrice()).toEqual(145);

    basketService.removeArticle(bookCollection[2]);
    expect(basketService.getTotalPrice()).toEqual(105);

    basketService.removeArticle(bookCollection[2]);
    expect(basketService.getTotalPrice()).toEqual(65);
    basketService.removeArticle(bookCollection[2]);
    expect(basketService.getTotalPrice()).toEqual(65);

    basketService.removeArticle(bookCollection[1]);
    expect(basketService.getTotalPrice()).toEqual(30);

    basketService.removeArticle(bookCollection[0]);
    expect(basketService.getTotalPrice()).toEqual(0);

  });

  it('should complete a book collection info using basket data', () => {
    basketService.addArticle(bookCollection[0]);
    let newCollectionOfBooks = [
      {
        title: 'test 1',
        price: 30,
        isbn: 'testisbn1'
      },
      {
        title: 'test 2',
        price: 30,
        isbn: 'unavailable'
      }
    ];
    basketService.syncNewCollection(newCollectionOfBooks);

    expect(newCollectionOfBooks[0].numberBought).toEqual(1);
    expect(newCollectionOfBooks[1].numberBought).toEqual(0);
  });

  it('should find the best offer and apply it', () => {

    basketService.addArticle(bookCollection[2]);
    basketService.addArticle(bookCollection[2]);
    basketService.addArticle(bookCollection[1]);
    basketService.addArticle(bookCollection[0]);
    //145
    const offers = [
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
      ];
    expect(basketService.getBestOffer(offers)).toEqual(130);
  });

});
