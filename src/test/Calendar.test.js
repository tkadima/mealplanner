import Calendar from '../components/Calendar'
import { shallow } from 'enzyme'

test('should test Calendar component', () => {
    const daysOfWeek = ['Sunday']
    const meals = ['Breakfast', 'Lunch', 'Dinner']

    var initialProps = {
        data: {'Sunday': {'Breakfast':[], 'Lunch':[], 'Dinner':[] }},
        daysOfWeek: daysOfWeek, 
        meals:meals,
        handleSelectMeal:jest.fn() 
    }
    const wrapper = shallow(<Calendar {...initialProps}/>);
    expect(wrapper).toMatchSnapshot();
   });