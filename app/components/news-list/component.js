import Component from 'ember-component';

const NewsList = Component.extend({
  tagName: 'section',

  classNames: ['Items'],

  items: [],

  didInsertElement() {
    console.log(this.get('items')[0]);
  }

});

NewsList.reopenClass({
  positionalParams: ['items']
});

export default NewsList;
