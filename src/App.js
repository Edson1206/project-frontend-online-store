import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import ShoppingCart from './Pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/shoppingCart" component={ ShoppingCart } />
            <Route exact path="/" component={ Home } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
