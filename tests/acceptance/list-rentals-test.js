import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list rentals');

test('should redirect to rentals home.', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });
});

test('should list available rentals.', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(find('.listing').length,  3, 'should see three listing');
  });
});

test('should link to information about the company', function(assert) {
  visit('/');
  click('a:contains("About")');
  andThen(function() {
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });
});

test('should link to contact information', function(assert) {
  visit('/');
  click('a:containts("Contact")');
  andThen(function() {
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });
});

test('should filter the list of rentals by city.', function(assert) {
  visit('/');
  fillIn('list-filter-input', 'madrid');
  keyEvent('list-filter-input', 'keyup', 69);
  andThen(function() {
    assert.equal(find('.listing').length, 1, 'should see 1 listing');
    assert.equal(find('.listing .location:contents("madrid")').length, 1, 'should content 1 listing with location' +
      ' madrid');
  });
});

test('should show details for a specific rental', function(assert) {
  visit('/');
  click('a:contains("Plaza mayor")');
  andThen(function() {
    assert.equal(currentURL(), '/rentals/plaza-mayor', 'should navigate to Plaza Mayor');
    assert.equal(find('show-listing h2').text(), "Plaza Mayor", 'should list rental title');
    assert.equal(find('description').length, 1, 'should list a description');
  });
});
