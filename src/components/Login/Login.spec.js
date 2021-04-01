import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Login from './Login';

enzyme.configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Login />
    );
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
