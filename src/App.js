import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';
import ProductCard from './Pages/ProductCard';

class App extends React.Component {
  constructor() {
    super();
    if (JSON.parse(localStorage.getItem('produtos'))) {
      this.state = {
        ItemsCarrinho: [...JSON.parse(localStorage.getItem('produtos'))],
        itemsShow: [...JSON.parse(localStorage.getItem('produtosMostrados'))],
      };
    } else {
      this.state = {
        ItemsCarrinho: [],
        itemsShow: [],
      };
    }
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
    const itemsNoArray = ItemsCarrinho.filter((e) => e.id === item.id);
    if (itemsNoArray.length === 1) {
      return '';
    }
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

  removeItem = (item) => {
    const { ItemsCarrinho, itemsShow } = this.state;
    const arr1 = itemsShow.filter((i) => i.id !== item.id);
    const arr = ItemsCarrinho.filter((e) => e.id !== item.id);
    this.setState({ ItemsCarrinho: arr, itemsShow: arr1 });
  }

  render() {
    const { ItemsCarrinho, itemsShow } = this.state;
    localStorage.setItem('produtos', JSON.stringify(ItemsCarrinho));
    localStorage.setItem('produtosMostrados', JSON.stringify(itemsShow));
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
                removeItem={ this.removeItem }
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
                ItemsCarrinho={ ItemsCarrinho }
                increaseButton={ this.increaseButton }
                decreaseButton={ this.decreaseButton }
              />) }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
