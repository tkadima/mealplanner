import React from 'react'
import { shallow } from 'enzyme'
import ErrorComponent from '../components/ErrorComponent'

test('should test ErrorComponent component', () => {
    const wrapper = shallow(<ErrorComponent />);
    expect(wrapper).toMatchSnapshot();
   });