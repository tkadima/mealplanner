import { Table } from 'semantic-ui-react'
import Meal from './Meal'

const Calendar = ({data, daysOfWeek, meals, handleSelectMeal}) => {
    const headerRow = daysOfWeek.map((day, i) => 
        <Table.HeaderCell key={i}>{day}</Table.HeaderCell>
    )
  
    
    const totalRow = daysOfWeek.map((day, i) => {
        return <Table.Cell key={i}>
            <p color="blue">0/2 cups of calories</p>
            <p color="red">0/1.5 cups of carbs</p>
            <p color="orange">0/6 ounces of fiber</p>
            <p color="purple">0/5 ounces of protein</p>
            <p color="green">0/2.5 cups of iron</p>
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
                </Table.Body>
                <Table.Row>
                    <Table.Cell>Totals</Table.Cell>
                    {totalRow}
                </Table.Row>
            </Table>
            
           
    )
}
export default Calendar
