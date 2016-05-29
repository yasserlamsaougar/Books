'use strict';
import {inject} from 'aurelia-framework';
import {OfferService} from './offer-service.js';
import {BasketService} from './basket-service.js';
import 'isomorphic-fetch';

@inject(OfferService, BasketService)
export class Basket {
  _articles = [];
  _offers = [];
  _currentPrice = 0;
  _currentPriceWithOffers = 0;
  _difference = 0;

  constructor(offerService, basketService) {
    this.basketService = basketService;
    this.offerService = offerService;
  }

  activate() {
    this._articles = this.basketService.articles;
    if(!this.shouldActivate(this._articles)) {
      return;
    }
    return this.offerService.getOffers(this._articles).then((offers) => {
      this.calculatePrice(offers);
      this._offers = offers;
      return offers;
    });
  }

  shouldActivate(articles) {
    return articles && articles.length > 0;
  }

  get currentPriceWithOffers() {
    return this._currentPriceWithOffers;
  }

  get bestOffer() {
    return this._bestOffer;
  }

  get currentPrice() {
    return this._currentPrice;
  }

  get difference() {
    return this._difference;
  }

  calculatePrice(offers) {
    let bestOffer = this.basketService.getBestOffer(offers.offers);
    this._currentPriceWithOffers = bestOffer.value;
    this._bestOffer = bestOffer.offer;
    this._currentPrice = this.basketService.getTotalPrice();
    this._difference = this._currentPrice - this._currentPriceWithOffers;

  }

  addArticle(item) {
    this.basketService.addArticle(item);
    this.calculatePrice(this._offers);
  }

  removeArticle(item) {
    this.basketService.removeArticle(item);
    this.calculatePrice(this._offers);
  }

  clearAllArticles() {
    this.basketService.clearAllArticles();
  }

  get totalArticles() {
    return this.basketService.articlesLength;
  }

  get offers() {
    return this._offers;
  }

  get articles() {
    return this._articles;
  }
}
