import { run } from '@ember/runloop'
import Route from 'ember-route'
import fetch from 'fetch'
import { computed, getWithDefault } from '@ember/object'
import { inject as service } from '@ember/service'

export default Route.extend({
  apiHost: 'https://api.hackernews.io',
  // apiHost: 'https://api.hackerwebapp.com',
  fastboot: service(),
  isFastBoot: computed.alias('fastboot.isFastBoot'),

  page: 'news',

  model() {
    let shoebox = this.get('fastboot.shoebox')
    let shoeboxStore = shoebox.retrieve('hn-data')
    let isFastBoot = this.get('isFastBoot')
    let page = this.get('page')
    let pageUrl = `${this.get('apiHost')}/${page}`

    if (isFastBoot) {
      if (!shoeboxStore) {
        shoeboxStore = {}
        shoebox.put('hn-data', shoeboxStore)
      }
      let lastPageTimestamp = shoeboxStore[`${page}Timestamp`]
      if (
        !lastPageTimestamp ||
        (lastPageTimestamp &&
          Number(lastPageTimestamp) < new Date().valueOf() - 60e3)
      ) {
        console.info('Fetching new items')
        return fetch(pageUrl)
          .then(response => response.json())
          .then(items => {
            let timestamp = new Date().valueOf()
            shoeboxStore[page] = items
            shoeboxStore[`${page}Timestamp`] = timestamp
            return []
          })
      }
    } else {
      if (shoeboxStore && shoeboxStore[page]) {
        console.log(shoeboxStore)
        return shoeboxStore[page]
      } else {
        return fetch(pageUrl).then(response => response.json())
      }
    }
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
