import React from 'react';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchBar: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { searchBar } = this.state;
    return (
      <div>
        <form>
          <input
            onChange={ this.handleChange }
            name="searchBar"
            value={ searchBar }
            type="text"
          />
          { !searchBar && (
            <h2 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h2>) }
        </form>
      </div>
    );
  }
}

export default Home;
