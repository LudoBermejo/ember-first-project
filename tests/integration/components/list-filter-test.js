import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('list-filter', 'Integration | Component | filter listing', {
  integration: true
});

const ITEMS = [{city: 'Madrid'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'Madrid'}];

test('should initialy load all listings', function(assert) {
  this.on('filterByCity', (val) => {
    if (val === '') {
      return RSVP.resolve(ITEMS);
    } else {
      return RSVP.resolve(FILTERED_ITEMS);
    }
  });

  this.render(hbs`
  {{#list-filter filter=(action 'filterByCity') as |results|}}
    <ul>
    {{#each results as |item|}}
      <li class="city">
        {{item.city}}
      </li>
    {{/each}}
    </ul>
  {{/list-filter}}`);

  // the wait function will return a promise that will wait for all promises
  // and xhr requests to resolve before running the contents of the then block.
  return wait().then(() => {
    assert.equal(this.$('.city').length, 3)
    assert.equal(this.$('.city').first().text().trim(), "Madrid");
  });


});

test('should update with matching listings', function(assert) {
  this.on('filterByCity', (val) => {
    if (val === '') {
      return RSVP.resolve(ITEMS);
    } else {
      return RSVP.resolve(FILTERED_ITEMS);
    }
  });

  this.render(hbs`
  {{#list-filter filter=(action 'filterByCity') as |results|}}
    <ul>
    {{#each results as |item|}}
      <li class="city">
        {{item.city}}
      </li>
    {{/each}}
    </ul>
  {{/list-filter}}`);

  this.$('.list-filter input').val('Madr').keyup();
  // the wait function will return a promise that will wait for all promises
  // and xhr requests to resolve before running the contents of the then block.
  return wait().then(() => {
    assert.equal(this.$('.city').length, 1)
    assert.equal(this.$('.city').text().trim(), "Madrid");
  });
});

export default Ember.Component.extend({
});
