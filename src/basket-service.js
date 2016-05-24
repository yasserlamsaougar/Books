'use strict';
import {OfferCalculator} from './offer-calculator.js'
import {inject} from 'aurelia-framework';

@inject(OfferCalculator)
export class BasketService {
  _items = [];
  BASKET_SESSION_KEY = 'books_basket';
  constructor(offerCalculator) {
    this.offerCalculator = offerCalculator;
    this._items = this.getArticlesFromSession() || [];
  }

  get articles() {
    return this._items;
  }

  get articlesLength() {
    return this._items.reduce((lastValue, currentArticle) => {
      return lastValue + currentArticle.numberBought;
    }, 0)
  }

  addArticle(item) {
    if (item) {
      if (item.numberBought) {
        item.numberBought++;
      }
      else {
        item.numberBought = 1;
        this._items.push(item);
      }
    }
    this.addArticlesToSession(this._items);
  }

  removeArticle(item) {
    if (item) {
      const newNumberBought = item.numberBought - 1;
      if (newNumberBought <= 0) {
        item.numberBought = 0;
        var indexOfItem = this._items.indexOf(item);
        if (indexOfItem >= 0) {
          this._items.splice(indexOfItem, 1);
        }
      }
      else {
        item.numberBought = newNumberBought;
      }
      this.addArticlesToSession(this._items);

    }
  }

  getTotalPrice() {
    return this._items.reduce((oldValue, currentValue) => {
      return oldValue + (currentValue.price * currentValue.numberBought);
    }, 0);
  }

  getBestOffer(offers) {
    const price = this.getTotalPrice();
    let bestOffer = {};
    offers.forEach((offer) => {
      const result = this.offerCalculator.getCalculator(offer.type)(price, offer);
      if (!bestOffer.value || (bestOffer.value > result)) {
        bestOffer.offer = offer.type;
        bestOffer.value = result;
      }
    });

    return bestOffer;
  }

  syncNewCollection(newCollection) {
    newCollection.forEach((article) => {
      const foundArticle = this._items.find(basketArticle => article.isbn === basketArticle.isbn);
      article.numberBought = (foundArticle && foundArticle.numberBought) || 0;
    });
  }

  addArticlesToSession(articles) {
    const stringifiedArticles = JSON.stringify(articles);
    sessionStorage.setItem(this.BASKET_SESSION_KEY, stringifiedArticles);
  }

  getArticlesFromSession() {
    return JSON.parse(sessionStorage.getItem(this.BASKET_SESSION_KEY)) || [];
  }

}
