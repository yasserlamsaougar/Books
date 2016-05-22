import './setup';
import {App} from '../../src/app';

class RouterStub {
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut;
  var mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('ReadMore');
  });

  it('should have a books route', () => {
    expect(sut.router.routes).toContain({
      route: ['', 'books'],
      name: 'books',
      moduleId: 'books',
      nav: false,
      title: 'Books Page'
    });
  });

  it('should have a basket route', () => {
    expect(sut.router.routes).toContain({
      route: ['basket'],
      name: 'basket',
      moduleId: 'basket',
      nav: false,
      title: 'Books Basket'
    });
  });
});
