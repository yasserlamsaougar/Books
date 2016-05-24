'use strict';
import {inject} from 'aurelia-framework';
import {BooksService} from './books-service.js';
import {BasketService} from './basket-service.js'
@inject(BooksService, BasketService)
export class Books {
  books = [];
  _boughtArticlesNumber = 0;

  constructor(bookService, basketService) {
    this.booksService = bookService;
    this.basketService = basketService;
  }

  activate() {
    return this.booksService.getBooks()
      .then(books => {
        this.basketService.syncNewCollection(books);
        this._boughtArticlesNumber = this.basketService.articlesLength;
        this.books = books;
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
}
