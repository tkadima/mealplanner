import { mount } from 'enzyme';
import App from '../components/App'
import Home from '../components/Home'
import { MemoryRouter } from 'react-router'
import React from 'react';

test('renders Home component for base path', () => {
  const component = mount(<MemoryRouter initialentries="{['/']}">
    <App/>
  </MemoryRouter>)
    expect(component.find(Home)).toHaveLength(1);
  })