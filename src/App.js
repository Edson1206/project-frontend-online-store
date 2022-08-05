import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={ Home } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
