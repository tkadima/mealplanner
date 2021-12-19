import { Table } from 'semantic-ui-react'
import _ from 'lodash'
import Meal from './Meal'

const Calendar = ({data, daysOfWeek, meals, handleSelectMeal, analysis}) => {
    const headerRow = daysOfWeek.map((day, i) => 
        <Table.HeaderCell key={i}>{day}</Table.HeaderCell>
    )
    
    const totalRow = daysOfWeek.map((day, i) => {
        return <Table.Cell key={i}>
           Summary for {day} <br/>
           {_.forOwn(analysis[day], nutrient => {
               console.log(nutrient)
           }) } 
        </Table.Cell>
    })
   
    return (
            <Table celled className="Calendar">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        {headerRow}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {
                    meals.map((meal, i) => {
                        const row = <Table.Row key={i}>
                            <Table.HeaderCell>{meal}</Table.HeaderCell>
                            {daysOfWeek.map((day, j) => {
                                let recipesForDayMeal = data[day][meal]
                                return (
                                    <Meal key={i + j} 
                                          meal={meal} 
                                          day={day} 
                                          selectMeal={handleSelectMeal}
                                          recipes={recipesForDayMeal}/>)
                                    })}
                        </Table.Row>
                        return row;
                    })
                }
                    <Table.Row>
                        <Table.Cell>Totals</Table.Cell>
                        {totalRow}
                    </Table.Row>
                </Table.Body>
                    
            </Table>
    )
}
export default Calendar
