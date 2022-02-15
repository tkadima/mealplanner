import React from 'react'
import { shallow } from 'enzyme'
import Layout from '../components/Layout'

test('should test Layout component', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper).toMatchSnapshot();
   });