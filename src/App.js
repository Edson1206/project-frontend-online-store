import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';
import ProductCard from './Pages/ProductCard';

class App extends React.Component {
  constructor() {
    super();
    this.state = { ItemsCarrinho: [],
      itemsShow: [],
    };
  }

  salvaNoCarrinho = (item) => {
    this.setState((prevState) => ({
      ItemsCarrinho: [...prevState.ItemsCarrinho, item],
    }));
    const { ItemsCarrinho } = this.state;
    if (!ItemsCarrinho.some((itemB) => itemB.id === item.id)) {
      this.setState((prevState) => ({
        itemsShow: [...prevState.itemsShow, item],
      }));
    }
  }

  increaseButton = (item) => {
    this.setState((prevState) => ({
      ItemsCarrinho: [...prevState.ItemsCarrinho, item],
    }));
  }

  decreaseButton = (item) => {
    const { ItemsCarrinho } = this.state;
    const arr = ItemsCarrinho;
    for (let i = 0; i < ItemsCarrinho.length; i += 1) {
      if (ItemsCarrinho[i].id === item.id) {
        ItemsCarrinho.splice(i, 1);
        break;
      }
    }
    this.setState(() => ({
      ItemsCarrinho: arr,
    }));
  }

  render() {
    const { ItemsCarrinho, itemsShow } = this.state;
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/shoppingCart"
              render={ () => (<ShoppingCart
                ItemsCarrinho={ ItemsCarrinho }
                itemsShow={ itemsShow }
                increaseButton={ this.increaseButton }
                decreaseButton={ this.decreaseButton }
              />) }
            />
            <Route
              exact
              path="/"
              render={ () => (<Home
                salvaNoCarrinho={ this.salvaNoCarrinho }
              />) }
            />
            <Route exact path="/product/:id" component={ ProductCard } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
