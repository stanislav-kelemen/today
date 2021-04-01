import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Input from './Input';

enzyme.configure({ adapter: new Adapter() });

describe('<Input />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Input />
    );
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
