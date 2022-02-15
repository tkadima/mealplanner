import { Icon, Label, Table } from 'semantic-ui-react'

const Meal = (props) => {
    let day = props.day 
    let meal = props.meal
    return (<Table.Cell  className="Meal" >
        <Icon color='teal' name='plus circle' onClick={() => props.selectMeal(day, meal, {op: 'add', recipe: null})}/>
         {props.recipes.map((r, i) => {
            return <Label key={i} 
                        as="a" 
                        onClick={() => props.selectMeal(day, meal, {op: 'edit', recipe: r})} 
                        className={day + meal + r.title}>
                {r.title}
            </Label>
        })}
    </Table.Cell>)
}

export default Meal