import React from 'react';
import { shallow } from '../../enzyme';

import Button from '.';

describe('Button Test', () => {

  it('renders', () => {
    const wrapper = shallow(<Button>hello</Button>);
    // Expect the wrapper object to be defined
    expect(wrapper.find('button').length).toEqual(1);
  });

});
