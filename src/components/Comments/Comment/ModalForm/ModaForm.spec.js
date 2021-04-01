import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import ModalForm from './ModalForm';

enzyme.configure({ adapter: new Adapter() });

describe('<ModalForm />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <ModalForm />
    );
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
