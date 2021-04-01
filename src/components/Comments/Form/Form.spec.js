import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Form from './Form';

enzyme.configure({ adapter: new Adapter() });

describe('<Form />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Form />
    );
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
