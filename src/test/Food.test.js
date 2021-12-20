import React from 'react'
import { shallow } from 'enzyme'

import Food from '../components/Food'

test('editting food should change display', () => {
    let wrapper = shallow(<Food></Food>)
    let editBtn = wrapper.find({name : 'pencil'})

    expect(wrapper.find('.food-card-header')).toHaveLength(1)
    expect(wrapper.find('.food-card-description')).toHaveLength(1)
    expect(wrapper.find({name: 'trash'})).toHaveLength(1)
    expect(wrapper.find({name: 'name'})).toHaveLength(0)
    expect(wrapper.find({name: 'description'})).toHaveLength(0)
    expect(wrapper.find({name: 'save'})).toHaveLength(0)

    editBtn.simulate('click')

    expect(wrapper.find('.food-card-header')).toHaveLength(0)
    expect(wrapper.find('.food-card-description')).toHaveLength(0)
    expect(wrapper.find({name: 'trash'})).toHaveLength(0)
    expect(wrapper.find({name: 'name'})).toHaveLength(1)
    expect(wrapper.find({name: 'description'})).toHaveLength(1)
    expect(wrapper.find({name: 'save'})).toHaveLength(1)
})

test('editting food changes text values', () => {
    let wrapper = shallow(<Food></Food>)
    let editBtn = wrapper.find({name : 'pencil'})
    let nameInput;
    let descriptionInput;
    let saveBtn;

    editBtn.simulate('click')
    nameInput = wrapper.find({name: 'name'})
    descriptionInput = wrapper.find({name: 'description'})

    nameInput.simulate('change', {
        currentTarget: {
          name: 'name' 
        },
        target: {
            value: 'Apple'
        }
    })

    descriptionInput.simulate('change', {
        currentTarget: {
            name: 'description'
        },
        target: {
            value: 'One a day keeps the doctor away'
        }
    })

    saveBtn = wrapper.find({name: 'save'})

    saveBtn.simulate('click')

    expect(wrapper.find('.food-card-header').render().text()).toEqual('Apple')
    expect(wrapper.find('.food-card-description').render().text()).toEqual('One a day keeps the doctor away')
})

test('uploading image should save image', () => {
    let wrapper = shallow(<Food></Food>)
    let editBtn = wrapper.find({name : 'pencil'})
    let image = wrapper.find('Image')

    expect(image.prop('src')).toEqual("https://react.semantic-ui.com/images/wireframe/image.png")

    editBtn.simulate('click')

    let fileInput = wrapper.find({type: 'file'})
    global.URL.createObjectURL = jest.fn();


    fileInput.simulate('change', {
        target: {
            files: ['file.jpg']
        }
    })
    let saveBtn = wrapper.find({name: 'save'})
    saveBtn.simulate('click')

    console.log(wrapper.debug())

})