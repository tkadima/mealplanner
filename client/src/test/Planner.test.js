import React from 'react'
import { mount } from 'enzyme'
import Planner from '../components/Planner'

describe('CRUD operations on recipes', () => {
    let plannerWrapper = mount(<Planner/>)
    let oatmealRecipe = {title: 'Oatmeal', ingredients: '1/2 cup oatmeal\n1 cup milk'}
    let eggRecipe = {title: 'Scrambled eggs', ingredients: '2 eggs\n 1 tbsp butter'}

    it('adding new recipe should add title to meal cell', async() => {

        let calendar = plannerWrapper.find('Calendar').first()
        let plusBtn = calendar.find('.teal.plus.circle.icon').first()
        plusBtn.simulate('click')

        expect(plannerWrapper.find('RecipeForm').prop('day')).toBe('Sunday')
        expect(plannerWrapper.find('RecipeForm').prop('meal')).toBe('Breakfast')

        let titleInput = plannerWrapper.find('RecipeForm').find('input[name="title"]')
        titleInput.simulate('change', {target: {value: oatmealRecipe.title}})

        let ingredientsInput = plannerWrapper.find('RecipeForm').find('textarea[name="ingredients"]')
        ingredientsInput.simulate('change', {target: {value: oatmealRecipe.ingredients}})

        let submitBtn = plannerWrapper.find('RecipeForm').find('.btn.btn-primary')
        submitBtn.simulate('click')

        expect(plannerWrapper.find('Meal').first().prop('recipes'))
                          .toStrictEqual([oatmealRecipe])
    })

    it('can add multiple dishes to one meal', () => {
    
        let calendar = plannerWrapper.find('Calendar')
        let plusBtn = calendar.find('.teal.plus.circle.icon').first()
        plusBtn.simulate('click')

        let titleInput = plannerWrapper.find('RecipeForm').find('input[name="title"]')
        titleInput.simulate('change', {target: {value: eggRecipe.title}})

        let ingredientsInput = plannerWrapper.find('RecipeForm').find('textarea[name="ingredients"]')
        ingredientsInput.simulate('change', {target: {value: eggRecipe.ingredients}})

        let submitBtn = plannerWrapper.find('RecipeForm').find('.btn.btn-primary')
        submitBtn.simulate('click')

        expect(plannerWrapper.find('Meal').first().prop('recipes'))
                        .toStrictEqual([oatmealRecipe, eggRecipe])
    })
    
    it('can edit recipes', () => {
        let calendar = plannerWrapper.find('Calendar')
        let eggLabel = calendar.findWhere(node => {
            return(
                node.type() &&
                node.name() &&
                node.text() === eggRecipe.title 
            )
        }).first()
        eggLabel.simulate('click')

        expect(plannerWrapper.find('RecipeForm').find('input[name="title"]').prop('disabled')).toBeTruthy()

        let ingredientsInput = plannerWrapper.find('RecipeForm').find('textarea[name="ingredients"]')
        ingredientsInput.simulate('change', {target: {value: eggRecipe.ingredients.concat('\n 1/2 tsp salt')}})

        let submitBtn = plannerWrapper.find('RecipeForm').find('.btn.btn-primary')
        submitBtn.simulate('click')

        let newEggRecipe = {title: eggRecipe.title, ingredients: '2 eggs\n 1 tbsp butter\n 1/2 tsp salt'}
        expect(plannerWrapper.find('Meal').first().prop('recipes'))
                        .toStrictEqual([oatmealRecipe, newEggRecipe])
    })

    it('can delete recipes', () =>{
        let calendar = plannerWrapper.find('Calendar')
        let eggLabel = calendar.findWhere(node => {
            return(
                node.type() &&
                node.name() &&
                node.text() === eggRecipe.title 
            )
        }).first()
        eggLabel.simulate('click')

        let deleteBtn = plannerWrapper.find('RecipeForm').find('.btn.btn-danger')
        deleteBtn.simulate('click')

        expect(plannerWrapper.find('Meal').first().prop('recipes')).toStrictEqual([oatmealRecipe])
    })
})

describe('form validation', () => {
    let plannerWrapper = mount(<Planner/>)
    let oatmealRecipe = {title: 'Oatmeal', ingredients: '1/2 cup oatmeal\n1 cup milk'}
    let calendar = plannerWrapper.find('Calendar')
    let plusBtn = null

    afterEach(() => {
        let closeBtn = plannerWrapper.find('RecipeForm').find('.close')
        closeBtn.simulate('click')
    })

    beforeEach(() => {
        plusBtn = calendar.find('.teal.plus.circle.icon').first()
        plusBtn.simulate('click')
    })

    it('shows error when title is empty', () => {
        let ingredientsInput = plannerWrapper.find('RecipeForm').find('textarea[name="ingredients"]')
        ingredientsInput.simulate('change', {target: {value: oatmealRecipe.ingredients}})

        let submitBtn = plannerWrapper.find('RecipeForm').find('.btn.btn-primary')
        submitBtn.simulate('click')

        expect(plannerWrapper.find('RecipeForm').prop('showModal')).toBeTruthy()
        expect(plannerWrapper.find('RecipeForm').prop('errors')).toStrictEqual({'title': 'Title cannot be empty'}) 
    })

    it('shows error when ingredients is empty', () => {
        let titleInput = plannerWrapper.find('RecipeForm').find('input[name="title"]')
        titleInput.simulate('change', {target: {value: oatmealRecipe.title}})

        let submitBtn = plannerWrapper.find('RecipeForm').find('.btn.btn-primary')
        submitBtn.simulate('click')

        expect(plannerWrapper.find('RecipeForm').prop('showModal')).toBeTruthy()
        expect(plannerWrapper.find('RecipeForm').prop('errors')).toStrictEqual({'ingredients': 'Ingredients cannot be empty'})
    })
    
    it('shows error when trying to add duplicate title', () => {
        plannerWrapper.find('RecipeForm').find('input[name="title"]').simulate('change', {target: {value: oatmealRecipe.title}})

        let ingredientsInput = plannerWrapper.find('RecipeForm').find('textarea[name="ingredients"]')
        ingredientsInput.simulate('change', {target: {value: oatmealRecipe.ingredients}})

        plannerWrapper.find('RecipeForm').find('.btn.btn-primary').simulate('click')
    
        expect(plannerWrapper.find('Meal').first().prop('recipes'))
                            .toStrictEqual([oatmealRecipe])

        plusBtn.simulate('click')

        let secondTitle = plannerWrapper.find('RecipeForm').find('input[name="title"]')
        secondTitle.simulate('change', {target: {value: oatmealRecipe.title}})

        let secondIngredientsInput = plannerWrapper.find('RecipeForm').find('textarea[name="ingredients"]')
        secondIngredientsInput.simulate('change', {target: {value: oatmealRecipe.ingredients}})

        plannerWrapper.find('RecipeForm').find('.btn.btn-primary').simulate('click')

        expect(plannerWrapper.find('RecipeForm').prop('showModal')).toBeTruthy()
        expect(plannerWrapper.find('RecipeForm').prop('errors'))
            .toStrictEqual({'title': 'Title is already saved. Either choose another title or select it from dropdown'}) 
        
 })
})

test('should exit out of modal correctly', () => {
    let wrapper = mount(<Planner />)
    let calendar = wrapper.find('Calendar')

    let plusBtn = calendar.find('.teal.plus.circle.icon').first()
    plusBtn.simulate('click')

    let closeBtn = wrapper.find('RecipeForm').find('.close')
    closeBtn.simulate('click')

    expect(wrapper.find('RecipeForm').length).toBe(0)
})