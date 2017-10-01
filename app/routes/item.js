import Ember from 'ember'
import fetch from 'fetch'
import Route from 'ember-route'

const { run } = Ember

export default Route.extend({
  apiHost: 'https://node-hnapi.herokuapp.com',

  model(params) {
    let { item_id: itemId } = params
    let pageUrl = `${this.get('apiHost')}/item/${itemId}`
    return fetch(pageUrl).then(response => response.json())
  },

  setupController(controller, item) {
    controller.setProperties({ item })
  },

  activate() {
    this._super(...arguments)
    run.next(() => window.scrollTo(0, 0))
  }
})
