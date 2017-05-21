import IndexRoute from './index';

export default IndexRoute.extend({
  page: 'ask',

  renderTemplate() {
    this.render('index', {
      controller: 'index',
      into: 'application'
    });
  }
});
