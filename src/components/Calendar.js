import { Table } from 'semantic-ui-react'
import Meal from './Meal'

const Calendar = ({data, daysOfWeek, meals, handleSelectMeal, summary}) => {
    const headerRow = daysOfWeek.map((day, i) => 
        <Table.HeaderCell key={i}>{day}</Table.HeaderCell>
    )
    const getTotal = (groupName, daySummary) => {
        return daySummary && daySummary[groupName] ? daySummary[groupName] : 0
    }
    const totalRow = daysOfWeek.map((day, i) => {
    //    let daySummary = summary[day]
    //     return <Table.Cell key={i}>
    //         <p color="blue">{getTotal('Dairy', daySummary)}/2 cups of dairy</p>
    //         <p color="red">{getTotal('Fruit', daySummary)}/1.5 cups of fruit</p>
    //         <p color="orange">{getTotal('Grain', daySummary)}/6 ounces of grain</p>
    //         <p color="purple">{getTotal('Protein', daySummary)}/5 ounces of protein</p>
    //         <p color="green">{getTotal('Vegetable', daySummary)}/2.5 cups of vegetables</p>
    //     </Table.Cell>
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
