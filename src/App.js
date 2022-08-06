import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';
import ProductCard from './Pages/ProductCard';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/shoppingCart" component={ ShoppingCart } />
            <Route exact path="/" component={ Home } />
            <Route exact path="/product/:id" component={ ProductCard } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
