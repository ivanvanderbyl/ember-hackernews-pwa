import Ember from 'ember';
import config from './config/environment';
import service from 'ember-service/inject';

const { get, run, Router: EmberRouter } = Ember;

const requestIdleCallback = window.requestIdleCallback || function(cb) {
  run.scheduleOnce('afterRender', cb);
};

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    requestIdleCallback(() => {
      let page = this.get('url');
      let title = this.getWithDefault('currentRouteName', 'unknown');

      get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('new');
  this.route('show');
  this.route('ask');
  this.route('jobs');
  this.route('about');
  this.route('item', { path: 'item/:item_id' });
});

export default Router;
