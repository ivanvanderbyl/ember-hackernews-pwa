import Ember from 'ember';
import computed from 'ember-computed';
export default Ember.Component.extend({
  tagName: 'article',

  itemID: null,

  position: 1,

  url: 'https://foo',

  title: 'Item 1',

  by: 'null',

  score: 0,

  commentsCount: 0,

  time: 0,

  timestamp: computed('time', {
    get() {
      let time = this.get('time');
      return new Date(time * 1e3);
    }
  })
});
