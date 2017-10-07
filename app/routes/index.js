import { run } from '@ember/runloop'
import Route from 'ember-route'
import fetch from 'fetch'
import { computed, getWithDefault } from '@ember/object'

export default Route.extend({
  apiHost: 'https://api.hackernews.io',
  // apiHost: 'https://api.hackerwebapp.com',
  isFastBoot: false,

  page: 'news',

  model() {
    let pageUrl = `${this.get('apiHost')}/${this.get('page')}`
    return fetch(pageUrl).then(response => response.json())
  },

  setupController(controller, items = []) {
    items.forEach((item, index) => (item.position = index + 1))
    controller.setProperties({ items })
  },

  resetController(controller) {
    controller.set('items', [])
  },

  lastScroll: 0,

  activate() {
    this._super(...arguments)
    if (!this.get('isFastBoot')) {
      run.scheduleOnce('afterRender', this, () =>
        window.scrollTo(0, this.get('lastScroll')),
      )
    }
  },

  actions: {
    willTransition() {
      if (!this.get('isFastBoot')) {
        this._super(...arguments)
        let lastScroll = getWithDefault(window || {}, 'scrollY', 0)
        this.set('lastScroll', lastScroll)
      }
    },
  },
})
