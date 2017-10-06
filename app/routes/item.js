import Route from '@ember/routing/route'
import { run } from '@ember/runloop'
import fetch from 'fetch'

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
  },
})
