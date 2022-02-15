import { Table } from 'semantic-ui-react'
import Meal from './Meal'

const Calendar = ({data, daysOfWeek, meals, handleSelectMeal, summary}) => {
    const headerRow = daysOfWeek.map((day, i) => 
        <Table.HeaderCell key={i}>{day}</Table.HeaderCell>
    )
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
                </Table.Body>
            </Table>
            
           
    )
}
export default Calendar
