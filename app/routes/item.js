import Route from '@ember/routing/route'
import fetch from 'fetch'

export default Route.extend({
  apiHost: 'https://node-hnapi.herokuapp.com',

  model({ item_id: itemId }) {
    return fetch(`${this.apiHost}/item/${itemId}`).then(response => response.json())
  },
})
