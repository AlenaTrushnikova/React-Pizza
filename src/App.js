import React, {Component, Fragment} from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

    state = {
        pizzas: [],
        selectedPizza: {},
        favePizzas: []
    }

    /**
     * GET data from server
     */
    componentDidMount() {
        fetch('http://localhost:3000/pizzas')
            .then(resp => resp.json())
            .then(data => this.setState({
                pizzas: data,
            }))
    }

    /**
     *when edit button is fired, sends selected pizza data to PizzaForm
     * @param pizza
     */
    handlePizzaEdit = (pizza) => {
        this.setState({
            selectedPizza: pizza
        })

    }

    /**
     * handles input changes in PizzaForm
     * @param e
     */
    handleChange = (e) => {
        e.persist()
        let value = e.target.value
        if (e.target.name === 'vegetarian') {
            value = e.target.value === 'Vegetarian' ? true : false
        }
        this.setState(prevState => ({
            selectedPizza: {
                ...prevState.selectedPizza,
                [e.target.name]: value
            }
        }))
    }

    /**
     * patch and update Pizza List
     */
    handlePizzaSubmit = () => {
        let selectedPizza = this.state.selectedPizza
        let allPizzas = this.state.pizzas
        fetch(`http://localhost:3000/pizzas/${selectedPizza.id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(selectedPizza)
        })
            .then(res => res.json())
            .then(selectedPizza => {
                allPizzas.splice(selectedPizza.id - 1, 1, selectedPizza)
                this.setState({
                    pizzas: allPizzas,
                    selectedPizza: {}
                })
            })
    }

    /**
     * move from all pizzas list to fav pizzas list and back
     * @param pizza
     */
    handleFave = (pizza) => {
        let favesPizzas = this.state.favePizzas
        let allPizzas = this.state.pizzas

        let updateFavePizzas = this.state.favePizzas.filter(item => item.id != pizza.id)
        let updateAllPizzas = this.state.pizzas.filter(item => item.id != pizza.id)

        if (favesPizzas.includes(pizza)) {
            this.setState({
                pizzas: [...allPizzas, pizza],
                favePizzas: updateFavePizzas
            })
        } else {
            this.setState({
                pizzas: updateAllPizzas,
                favePizzas : [...favesPizzas, pizza]
            })
        }
        console.log(this.state)
    }

    render() {
        const {pizzas, selectedPizza, favePizzas} = this.state
        return (
            <Fragment>
                <Header/>

                <PizzaForm selectedPizza={selectedPizza}
                           handleChange={this.handleChange}
                           handlePizzaSubmit={this.handlePizzaSubmit}/>
                <h2>Favourite Pizzas</h2>
                <PizzaList pizzas={favePizzas}
                           handlePizzaEdit={this.handlePizzaEdit}
                           handleFave={this.handleFave}/>
                <h2>All Pizzas</h2>
                <PizzaList pizzas={pizzas}
                           handlePizzaEdit={this.handlePizzaEdit}
                           handleFave={this.handleFave}/>
            </Fragment>
        );
    }
}

export default App;
