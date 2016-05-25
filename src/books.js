'use strict';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {BooksService} from './books-service.js';
import {BasketService} from './basket-service.js'
@inject(BooksService, BasketService, Router)
export class Books {
  books = [];
  _boughtArticlesNumber = 0;

  constructor(bookService, basketService, router) {
    this.booksService = bookService;
    this.basketService = basketService;
    this.router = router;
  }

  activate() {
    return this.booksService.getBooks()
      .then(books => {
        this.books = this.basketService.syncNewCollection(books);
        this._boughtArticlesNumber = this.basketService.articlesLength;
        return books;
      });
  }

  get boughtArticlesNumber() {
    return this._boughtArticlesNumber;
  }

  get totalPrice() {
    return this.basketService.getTotalPrice();
  }

  addArticle(article) {
    this.basketService.addArticle(article);
    this._boughtArticlesNumber = this.basketService.articlesLength;
  }

  removeArticle(article) {
    this.basketService.removeArticle(article);
    this._boughtArticlesNumber = this.basketService.articlesLength;
  }

  clearAllArticles() {
    this.basketService.clearAllArticles();
    this._boughtArticlesNumber = this.basketService.articlesLength;
  }
}
