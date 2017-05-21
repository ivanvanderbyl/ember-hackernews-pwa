import Component from 'ember-component';
import $ from 'jquery';
import Ember from 'ember';
const { run } = Ember;

export default Component.extend({
  tagName: 'header',

  originalTopOffset: 0,

  floated: false,

  classNameBindings: ['floated:is-floated:not-floated'],

  didInsertElement() {
    let originalTopOffset = this.element ? this.element.offsetTop : 0;
    let clientHeight = this.element ? this.element.clientHeight : 0;

    this.originalTopOffset = originalTopOffset;
    this.originalHeight = clientHeight;
    $(document).on('touchmove.scrollable', this._handleScroll.bind(this));
    $(window).on('scroll.scrollable', this._handleScroll.bind(this));
    this._handleScroll();
  },

  willDestroyElement() {
    $(document).off('touchmove.scrollable', this._handleScroll);
    $(window).off('scroll.scrollable', this._handleScroll);
  },

  _handleScroll() {
    let { originalTopOffset } = this;
    run(this, () => {
      this.set('floated', window.pageYOffset > originalTopOffset);
    });
  }
});
