import React from 'react'
import { mount } from 'enzyme'
import Meal from '../components/Meal'

test('should call selectMeal on click', () => {
    let recipeList = ["Cod", "Steamed Spinach", "Soba Noodles"]

    let initalProps = {
        meal: 'Dinner',
        day: 'Sunday',
        recipes: recipeList,
        selectMeal: jest.fn()
    }
    const wrapper = mount (<Meal {...initalProps}/>);
    let plusBtn = wrapper.find('.plus')
    plusBtn.simulate('click')
    expect(initalProps.selectMeal).toHaveBeenCalledTimes(1)
})

test('should be able to click on recipe titles to edit', () => {
    let recipes = [{'Eggs': '2 eggs'}]
    let initalProps = {
        meal: 'Dinner',
        day: 'Sunday',
        recipes: recipes,
        selectMeal: jest.fn()
    }
    const wrapper = mount (<Meal {...initalProps}/>);
    let link = wrapper.find('a').first()
    link.simulate('click')

    expect(initalProps.selectMeal).toHaveBeenCalledTimes(1)

})