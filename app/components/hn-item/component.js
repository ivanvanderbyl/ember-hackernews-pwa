import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({
  tagName: 'article',

  itemID: null,

  position: 1,

  url: 'https://foo',

  title: 'Item 1',

  by: 'null',

  score: 0,

  domain: null,

  commentsCount: 0,

  time: 0,

  isSelfLink: computed('url', {
    get() {
      let url = this.get('url');
      return /^item\?id\=/.test(url);
    }
  }),

  timestamp: computed('time', {
    get() {
      let time = this.get('time');
      return new Date(time * 1e3);
    }
  })
});
