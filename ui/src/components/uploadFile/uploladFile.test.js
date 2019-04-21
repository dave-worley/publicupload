import React from 'react';
import { shallow } from '../../enzyme';

import UploadFile from '.';

describe('ListUploads Test', () => {

  it('renders', () => {
    const wrapper = shallow(<UploadFile />);
    // Expect the wrapper object to be empty because state.uploadFormVisible is false
    expect(wrapper.find('div.modal').length).toEqual(0);
  });

});
