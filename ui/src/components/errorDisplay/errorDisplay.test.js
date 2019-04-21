import React from 'react';
import { shallow } from '../../enzyme';

import ErrorDisplay from '.';

describe('Error Test', () => {

  it('renders', () => {
    const wrapper = shallow(<ErrorDisplay>hello</ErrorDisplay>);
    expect(wrapper.find('div.error').length).toEqual(1);
    expect(wrapper.find('div.content').text()).toEqual('hello');
  });

});
