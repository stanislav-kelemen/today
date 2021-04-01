import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Header from './Header';

enzyme.configure({ adapter: new Adapter() });

describe('<Header />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Header />
    );
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
