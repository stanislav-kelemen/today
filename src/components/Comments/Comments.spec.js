import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Comments from './Comments';

enzyme.configure({ adapter: new Adapter() });

describe('<Comments />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Comments />
    );
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
