import React from "react"

const Pizza = (props) => {
    return (
        <tr>
            <td>{props.pizza.topping}</td>
            <td>{props.pizza.size}</td>
            <td>{props.pizza.vegetarian ? 'yes' : 'no'}</td>
            <td>
                <button type="button" className="btn btn-primary"
                        onClick={() => props.handlePizzaEdit(props.pizza)}>Edit Pizza
                </button>
            </td>
            <td>
                <button type="button"
                        className="btn btn-primary"
                        onClick={() => props.handleFave(props.pizza)}> Like!
                </button>
            </td>

        </tr>
    )
};

export default Pizza
