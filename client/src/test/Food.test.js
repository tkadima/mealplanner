import React from 'react'
import { shallow, mount } from 'enzyme'

import Food from '../components/Food/Food'

test('should correctly display food card color', () => {
    const dairy = shallow(<Food {...{foodGroup: 'dairy'}}/>)
    const fruit = shallow(<Food {...{foodGroup: 'fruit'}}/>)
    const grain = shallow(<Food {...{foodGroup: 'grain'}}/>)
    const other = shallow(<Food {...{foodGroup: 'other'}}/>)
    const protein = shallow(<Food {...{foodGroup: 'protein'}}/>)
    const vegetable = shallow(<Food {...{foodGroup: 'vegetable'}}/>)

    expect(dairy.find('Card').prop('color')).toEqual('blue')
    expect(fruit.find('Card').prop('color')).toEqual('red')
    expect(grain.find('Card').prop('color')).toEqual('orange')
    expect(other.find('Card').prop('color')).toEqual('grey')
    expect(protein.find('Card').prop('color')).toEqual('purple')
    expect(vegetable.find('Card').prop('color')).toEqual('green')
})

test('delete button should delete food', () => {
    const wrapper = shallow(<Food {...{onDelete: jest.fn()}}/>)
    let deleteBtn = wrapper.find('.food__button--delete')
    deleteBtn.simulate('click')
    expect(wrapper).toEqual({})
})

test('clicking edit should direct to EditFood', () => {
    const wrapper = shallow(<Food {...{foodId: 1}}/>)
    expect(wrapper.find('Link').prop('to')).toEqual('/fridge/update/1')
})