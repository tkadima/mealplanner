import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'

import CreateFood from '../components/Food/CreateFood'
import FoodForm from '../components/Food/FoodForm'

describe('creating new food ', () => {
    let createFoodProps = {
        setFoodList: jest.fn(), 
        foodList: []
    }

    let formProps = {
        op: 'create',
        handleOnSubmit: jest.fn()
    }

    const wrapper = mount(<MemoryRouter>
        <CreateFood {...createFoodProps}>
            <FoodForm {...formProps}/>
        </CreateFood>
    </MemoryRouter>)

    const formWrapper = wrapper.find('FoodForm')

    const entries = jest.fn()
    const append = jest.fn()

    global.FormData = () => ({ entries, append })

    console.log('formdata', global.FormData)

    it('should set food values', () => {
        const apple = {
            name: 'apple',
            description: 'have one a day',
            quantity: 1, 
            unit: 'cups', 
            foodGroup: 'fruit', 
            calories: 65
        }

        for (const property in apple) {
            let field = wrapper.find(`[name="${property}"]`)
            
            expect(field).toBeTruthy()
            expect(field.prop.value).toBeFalsy()

           field.first().simulate('change', {
                currentTarget: {
                    name: property
                },
                target: {
                    value: apple[property]
                }

            })
        }
        let btn = formWrapper.find('Button.food-form__btn--submit') 
        btn.simulate('click')
       // expect(createFoodProps.foodList.length).toEqual(1)
    })
    
})