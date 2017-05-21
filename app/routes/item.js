import Ember from 'ember';
import Route from 'ember-route';
import service from 'ember-service/inject';

export default Route.extend({
  ajax: service(),

  apiHost: 'https://node-hnapi.herokuapp.com',

  model(params) {
    let { item_id: itemId } = params;
    return this.get('ajax').request(`${this.get('apiHost')}/item/${itemId}`);
  },

  setupController(controller, item) {
    controller.setProperties({ item });
  }

});
