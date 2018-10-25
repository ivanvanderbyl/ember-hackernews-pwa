import Component from '@ember/component'
import { run } from '@ember/runloop'

export default Component.extend({
  tagName: 'header',
  originalTopOffset: 0,
  floated: false,
  isOnline: true,
  classNameBindings: ['floated:is-floated:not-floated', 'isOnline'],

  didInsertElement() {
      this.originalTopOffset = this.element.offsetTop

      document.addEventListener('touchmove', this.handleScroll.bind(this), {
        passive: true,
      })
      window.addEventListener('scroll', this.handleScroll.bind(this), {
        passive: true,
      })

      window.addEventListener('offline', () => this.handleOffline.bind(this))
      window.addEventListener('online', () => this.handleOnline.bind(this))
      this.set('isOnline', navigator.onLine)

      this.handleScroll()
  },

  willDestroyElement() {
    document.removeEventListener('touchmove', this.handleScroll)
    window.removeEventListener('scroll', this.handleScroll)
  },

  handleOffline() {
    this.set('isOnline', false)
  },

  handleOnline() {
    this.set('isOnline', true)
  },

  handleScroll() {
    run.throttle(this, () => {
      this.set('floated', window.pageYOffset > this.originalTopOffset)
    }, 70)
  },
})
