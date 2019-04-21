import React from 'react';
import { shallow } from '../../enzyme';

import SearchBar from '.';

describe('SearchBar Test', () => {

  it('renders', () => {
    const wrapper = shallow(<SearchBar />);
    // Expect the wrapper object to be defined
    expect(wrapper.find('input').length).toEqual(1);
  });

});
