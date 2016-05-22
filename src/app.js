export class App {
  configureRouter(config, router) {
    config.title = 'ReadMore';
    config.map([
      {route: ['', 'books'], name: 'books', moduleId: 'books', nav: false, title: 'Books Page'},
      {route: ['basket'], name: 'basket', moduleId: 'basket', nav: false, title: 'Books Basket'}
    ]);

    this.router = router;
  }
}
