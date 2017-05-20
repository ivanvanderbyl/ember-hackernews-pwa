import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  by: attr(),
  kids: attr(),
  parent: attr(),
  text: attr(),
  time: attr(),
  type: attr()
});
