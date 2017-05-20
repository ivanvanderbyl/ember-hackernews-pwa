import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
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
