import React from 'react';
import { shallow } from '../../enzyme';

import ListUploads from '.';

describe('ListUploads Test', () => {

  it('renders', () => {
    const wrapper = shallow(<ListUploads />);
    // Expect the wrapper object to be defined
    expect(wrapper.find('h2').text()).toEqual('0 Documents 0KB');
  });

});
