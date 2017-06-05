import Route from 'ember-route';
import fetch from 'fetch';

export default Route.extend({
  apiHost: 'https://node-hnapi.herokuapp.com',

  page: 'news',

  model() {
    let pageUrl = `${this.get('apiHost')}/${this.get('page')}`;
    return fetch(pageUrl).then((response) => response.json());
  },

  setupController(controller, items) {
    items.forEach((item, index) => item.position = index + 1);
    controller.setProperties({ items });
  },

  resetController(controller) {
    controller.set('items', []);
  }
});
