import Ember from 'ember'
import Route from 'ember-route'
import fetch from 'fetch'
import { inject as service } from '@ember/service'
import { computed } from '@ember/object'
const { run, getWithDefault } = Ember

export default Route.extend({
  apiHost: 'https://node-hnapi.herokuapp.com',
  fastboot: service(),
  isFastBoot: computed.reads('fastboot.isFastBoot'),

  page: 'news',

  model() {
    let pageUrl = `${this.get('apiHost')}/${this.get('page')}`
    return fetch(pageUrl).then(response => response.json())
  },

  setupController(controller, items) {
    if (this.get('isFastBoot')) {
      items = items.slice(0, 3)
    }
    items.forEach((item, index) => (item.position = index + 1))
    controller.setProperties({ items })
  },

  resetController(controller) {
    controller.set('items', [])
  },

  lastScroll: 0,

  activate() {
    this._super(...arguments)
    if (typeof FastBoot === 'undefined') {
      run.scheduleOnce('afterRender', this, () =>
        window.scrollTo(0, this.get('lastScroll'))
      )
    }
  },

  actions: {
    willTransition() {
      this._super(...arguments)
      let lastScroll = getWithDefault(window || {}, 'scrollY', 0)
      this.set('lastScroll', lastScroll)
    }
  }
})
