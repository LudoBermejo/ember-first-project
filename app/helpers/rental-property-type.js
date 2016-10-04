import Ember from 'ember';

const communityPropertyTypes = [
  'Condo',
  'Townhouse',
  'Monument',
  'Apartment'
];

export function rentalPropertyType([type]/*, hash*/) {
  if(communityPropertyTypes.includes(type)) {
    return "Community";
  }
  return "Standalone";
}

export default Ember.Helper.helper(rentalPropertyType);
