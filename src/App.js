import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';
import ProductCard from './Pages/ProductCard';

class App extends React.Component {
  constructor() {
    super();
    this.state = { ItemsCarrinho: [] };
  }

  salvaNoCarrinho = (item) => {
    this.setState((prevState) => ({
      ItemsCarrinho: [...prevState.ItemsCarrinho, item],
    }));
  }

  render() {
    const { ItemsCarrinho } = this.state;
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/shoppingCart"
              render={ () => (<ShoppingCart
                ItemsCarrinho={ ItemsCarrinho }
              />) }
            />
            <Route
              exact
              path="/"
              render={ () => (<Home
                salvaNoCarrinho={ this.salvaNoCarrinho }
              />) }
            />
            <Route
              exact
              path="/product/:id"
              render={ (props) => (<ProductCard
                { ...props }
                salvaNoCarrinho={ this.salvaNoCarrinho }
              />) }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
