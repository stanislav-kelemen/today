import React from 'react';
import { shallow } from 'enzyme';

import LoadingContainer from './LoadingContainer';

const mockedProps = {
  isLoading: true,
  isEmpty: false,
  isPreview: false,
  loadingMessage: "No items",
  children: <div />
}

describe('Rendering without crushing', () => {
  let component;
  beforeEach(() => {
    component = shallow(
      <LoadingContainer {...mockedProps}/>
    );
  });

  test('shold render', () => {
    expect(component).toMatchSnapshot();
  });

  test('should render Preloader when isLoading', () => {
    expect(component.find('Preloader')).toHaveLength(1);
  });

  test('should render Preloader when isLoading', () => {
    component.setProps({isEmpty: true, isLoading:false});
    component.update();

    expect(component.text().includes("No items")).toBeTruthy();
  });

});
