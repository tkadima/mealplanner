import React from 'react'
import { mount, shallow } from 'enzyme'
import RecipeForm from '../components/RecipeForm'
import { FormControl } from 'react-bootstrap';

describe('Filling form in modal', () => {
    let recipes = {'soba' : ['1 oz soba', '1 tablespoon olive oil']}
    const initialProps = {
        recipes: recipes,
        meal: 'Breakfast',
        day: 'Monday',
        open: true,
        onSubmit: jest.fn(),
        errors: {}
      };
    const wrapper = shallow(<RecipeForm {...initialProps}/>)

    it('should set title value on change event', () => {
        let title = wrapper.find('FormControl').at(1)

        expect(title.prop('value')).toEqual('')
        title.simulate('change', { 
            currentTarget: {
                name: 'title'
            },
            target: {
                value: 'Eggs'
            }
        })
        expect(wrapper.find('FormControl').at(1).prop('value')).toEqual('Eggs')
    })
    it('should set recipe value on change event', () => {
        let ingredients = wrapper.find(FormControl).at(2)
        expect(ingredients.prop('value')).toEqual('')

        ingredients.simulate('change', {
            currentTarget: { 
                name: 'ingredients'
            },
            target: {
                value: '2 eggs\n 1 dash salt\n 1 tbsp butter'
            }
        })

        expect(wrapper.find('FormControl').at(2).prop('value')).toEqual('2 eggs\n 1 dash salt\n 1 tbsp butter')
    })

    it('should set title value from dropdown', () => {
        let select = wrapper.find('FormControl').first()
        select.simulate('change', {
            currentTarget: {
                name: 'recipe-select'
            },
            target: {
                value: 'Oatmeal'
            }
        })
        expect(wrapper.find('FormControl').at(1).prop('value')).toEqual('Oatmeal')
        expect(wrapper.find('FormControl').at(1).prop('disabled')).toBeTruthy()
    })
    
    it('should call onSubmit on click button event', () => {
       let btn = wrapper.find('button')
       btn.simulate('click')
       expect(initialProps.onSubmit).toHaveBeenCalledTimes(1)
    })
})





