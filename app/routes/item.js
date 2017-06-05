import fetch from 'fetch';
import Route from 'ember-route';

export default Route.extend({
  apiHost: 'https://node-hnapi.herokuapp.com',

  model(params) {
    let { item_id: itemId } = params;
    let pageUrl = `${this.get('apiHost')}/item/${itemId}`;
    return fetch(pageUrl).then((response) => response.json());
  },

  setupController(controller, item) {
    controller.setProperties({ item });
  }

});
