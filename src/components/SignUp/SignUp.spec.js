import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import SignUp from './SignUp';

enzyme.configure({ adapter: new Adapter() });

describe('<SignUp />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <SignUp />
    );
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
