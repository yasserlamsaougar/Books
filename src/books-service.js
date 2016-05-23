'use strict';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'isomorphic-fetch';

@inject(HttpClient)
export class BooksService {
  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://henri-potier.xebia.fr/');
    });
    this.http = http;
  }

  getBooks() {
    return this.http.fetch('books')
      .then(response => response.json());
  }
}
