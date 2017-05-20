import Ember from 'ember';
import firebase from 'firebase';
import RSVP from 'rsvp';

export default Ember.Route.extend({

  model() {
    let config = {
      databaseURL: 'https://hacker-news.firebaseio.com'
    };
    firebase.initializeApp(config);

    return new RSVP.Promise((resolve) => {
      firebase.database().ref('v0/topstories').once('value', (snap) => {
        let ids = snap.val();

        resolve(RSVP.all(ids.slice(0, 20).map((id, index) => {
          return new RSVP.Promise((resolve) => {
            firebase.database().ref(`v0/item/${id}`).once('value', (snap) => {
              let item = snap.val();
              item.position = index + 1;
              resolve(item);
            });
          });
        })));
      });
    });
  },

  setupController(controller, items) {
    console.log(items);
    controller.setProperties({ items });
  }

});
