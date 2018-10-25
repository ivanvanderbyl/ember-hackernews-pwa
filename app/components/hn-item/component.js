import Component from '@ember/component'
import { computed } from '@ember/object'
import { equal, or } from '@ember/object/computed'

export default Component.extend({
  tagName: 'article',

  isJob: equal('type', 'job'),
  defaultScore: 0,

  safeScore: or('score', 'defaultScore'),

  isSelfLink: computed('url', function() {
      return /^item\?id=/.test(this.url)
  }),

  timestamp: computed('time', function() {
      return new Date(this.time * 1e3)
  }),

  index: computed('position', function() {
    return this.position + 1
  }),

  scoreText: computed('safeScore', function() {
    if (this.safeScore === 0) {
      return '0 points'
    } else if (this.safeScore === 1) {
      return '1 point'
    } else {
      return `${this.safeScore} points`
    }
  })
})
