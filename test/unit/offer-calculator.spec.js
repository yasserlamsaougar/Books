import './setup';
import {OfferCalculator} from '../../src/offer-calculator.js';


describe('The offer calculator', () => {
  let offerCalculator;
  beforeEach(() => {
    offerCalculator = new OfferCalculator();
  });

  it('should calculate a slice offer correctly', () => {
    const calculator = offerCalculator.getCalculator('slice');
    let result = calculator(145, {
      sliceValue: 100,
      value: 12
    });
    expect(result).toEqual(133);

    result = calculator(250, {
      sliceValue: 100,
      value: 12
    });

    expect(result).toEqual(226);

    result = calculator(30, {
      sliceValue: 100,
      value: 42
    });

    expect(result).toEqual(30);

    result = calculator(30);
    expect(result).toEqual(30);
  });

  it('should calculate a minus offer correctly', () => {
    const calculator = offerCalculator.getCalculator('minus');
    let result = calculator(145, {
      value: 24
    });
    expect(result).toEqual(121);

    result = calculator(250, {
      value: 30
    });

    expect(result).toEqual(220);

    result = calculator(20, {
      value: 30
    });
    expect(result).toEqual(0);

    result = calculator(20);
    expect(result).toEqual(20);

  });

  it('should calculate a percentage offer correctly', () => {
    const calculator = offerCalculator.getCalculator('percentage');
    let result = calculator(145, {
      value: 5
    });

    expect(result).toEqual(137.75);

    result = calculator(145);
    expect(result).toEqual(145);
  });
});
