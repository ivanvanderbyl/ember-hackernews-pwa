import Route from 'ember-route';
import service from 'ember-service/inject';

export default Route.extend({
  ajax: service(),

  apiHost: 'https://node-hnapi.herokuapp.com',

  page: 'news',

  model() {
    return this.get('ajax').request(`${this.get('apiHost')}/${this.get('page')}`);
  },

  setupController(controller, items) {
    items.forEach((item, index) => item.position = index + 1);
    console.info('First post:', items[0].title);
    console.log(controller);
    controller.setProperties({ items });
  },

  resetController(controller) {
    controller.set('items', []);
  }
});
