import Component from 'ember-component'

const NewsList = Component.extend({
  tagName: 'section',

  classNames: ['Items'],

  items: []
})

NewsList.reopenClass({
  positionalParams: ['items']
})

export default NewsList
