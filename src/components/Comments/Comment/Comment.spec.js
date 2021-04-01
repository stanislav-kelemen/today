import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Comment from './Comment';

enzyme.configure({ adapter: new Adapter() });

describe('<Comment />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Comment />
    );
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
