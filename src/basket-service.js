'use strict';
import {OfferCalculator} from './offer-calculator.js'
import {inject} from 'aurelia-framework';

@inject(OfferCalculator)
export class BasketService {
  _items = [];

  constructor(offerCalculator) {
    this.offerCalculator = offerCalculator;
  }
  get articles() {
    return this._items ;
  }

  get articlesLength() {
    return this._items.reduce((lastValue, currentArticle) => {
      return lastValue + currentArticle.numberBought;
    }, 0)
  }

  addArticle(item) {
    if(item) {
      if(item.numberBought) {
        item.numberBought++;
      }
      else {
        item.numberBought = 1;
        this._items.push(item);
      }
    }
  }

  removeArticle(item) {
    if(item) {
      const newNumberBought = item.numberBought - 1;
      if(newNumberBought <= 0) {
        item.numberBought = 0;
        var indexOfItem = this._items.indexOf(item);
        if(indexOfItem >= 0) {
          this._items .splice(indexOfItem, 1);
        }
      }
      else {
        item.numberBought = newNumberBought;
      }
    }
  }

  getTotalPrice() {
    return this._items.reduce((oldValue, currentValue) => {
      return oldValue + (currentValue.price * currentValue.numberBought);
    }, 0);
  }

  getBestOffer(offers) {
    const price = this.getTotalPrice();
    const results = [];
    offers.forEach((offer) => {
      const calculator = this.offerCalculator.getCalculator(offer.type);
      results.push(calculator(price, offer));
    });

    return Math.min(...results);
  }

  syncNewCollection(newCollection) {
    newCollection.forEach((article) => {
      const foundArticle = this._items.find(basketArticle => article.isbn === basketArticle.isbn);
      article.numberBought = (foundArticle && foundArticle.numberBought) || 0;
    });
  }

}
