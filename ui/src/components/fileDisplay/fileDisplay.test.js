import React from 'react';
import { shallow } from '../../enzyme';

import FileDisplay from '.';

describe('FileDisplay Test', () => {
  it('renders', () => {
    const wrapper = shallow(<FileDisplay file={{
      id: 12345,
      size: 10000,
      name: 'some_file.png'
    }} />);
    expect(wrapper.find('p.documentName').text()).toEqual('some_file.png');
    expect(wrapper.find('p.documentSize').text()).toEqual(10000/1000 + 'KB');
  });

});
