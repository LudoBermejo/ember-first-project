import { moduleFor, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

let StubMapsService = Ember.Service.extends({
  getMapElement(location) {
    this.set('calledWithLocation', location);
    return document.createElement('div');
  }
});

moduleFor('controller:location-map', 'Integration | Controller | location map', {
  integration: true,
  beforeEach() {
    this.register('service:maps', StubMapsService);
    this.inject.service('maps', { as: 'mapsService'});
  }
});

test('should append map elemento container element', function(assert) {
  this.set('myLocation', 'Madrid');
  this.render(hbs`{{location-map location=myLocation}}`);
  assert.equal(this.$('.map-container').children().length, 1, 'the map element');
  assert.equal(this.get('mapsService.calledWithLocation'), 'Madrid', 'a map of Madrid should be requested');
});
