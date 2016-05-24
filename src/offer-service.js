'use strict';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'isomorphic-fetch';

@inject(HttpClient)
export class OfferService {
  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://henri-potier.xebia.fr/');
    });
    this.http = http;
  }

  getOffers(books) {
    let joinedIsbns = this.getIsbnsAsString(books, ',');
    return this.http.fetch(`books/${joinedIsbns}/commercialOffers`)
      .then(response => response.json());
  }

  getIsbnsAsString(books, separator) {
    let result = [];
    books.forEach((book) => {
      const numberBought = book.numberBought || 0;
      for(let i = 0; i < numberBought; ++i) {
        result.push(book.isbn);
      }
    });
    return result.join(separator);
  }
}
