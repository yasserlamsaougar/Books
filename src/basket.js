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
  constructor(offerService, basketService) {
    this.basketService = basketService;
    this.offerService = offerService;
  }

  activate() {
    this._articles = this.basketService.articles;
    return this.offerService.getOffers(this._articles).then((offers) => {
      this.calculatePrice(offers);
      this._offers = offers;
      return offers;
    });
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

  calculatePrice(offers) {
    let bestOffer = this.basketService.getBestOffer(offers.offers);
    this._currentPriceWithOffers = bestOffer.value;
    this._bestOffer = bestOffer.offer;
    this._currentPrice = this.basketService.getTotalPrice();
  }

  addArticle(item) {
    this.basketService.addArticle(item);
    this.calculatePrice(this._offers);
  }

  removeArticle(item) {
    this.basketService.removeArticle(item);
    this.calculatePrice(this._offers);
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
