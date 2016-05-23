'use strict';

export class OfferCalculator {

  calculatorMap = {
    slice: this.slice,
    percentage: this.percentage,
    minus: this.minus
  };

  getCalculator(type) {
    return this.calculatorMap[type];
  }

  slice(price, options) {

    const sliceValue = (options && options.sliceValue) || 1;
    const value = (options && options.value) || 0;
    const slicesNumber = Math.floor(price / sliceValue);
    return Math.max(0, price - (value * slicesNumber));
  }

  percentage(price, options) {
    const percentageValue = (options && options.value) || 0;
    return Math.max(0, price - (price * percentageValue / 100))
  }

  minus(price, options) {
    const minusValue = (options && options.value) || 0;
    return Math.max(0, price - minusValue);
  }


}
