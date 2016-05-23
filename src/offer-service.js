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

  getOffers(isbns) {
    const joinedIsbns = isbns.join(',');
    return this.http.fetch(`books/${joinedIsbns}/commercialOffers`)
      .then(response => response.json());
  }
}
