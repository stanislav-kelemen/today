import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Home from './Home';

enzyme.configure({ adapter: new Adapter() });

describe('<Home />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Home />
    );
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
