import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchBar: '',
      listCategories: [],
    };
  }

  componentDidMount = async () => {
    this.setState({
      listCategories: await getCategories(),
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { searchBar, listCategories } = this.state;
    console.log(listCategories);
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/shoppingCart">ShoppingCart</Link>
        <aside>
          <ul>
            {listCategories.map((category) => (
              <li key={ category.id }>
                <label data-testid="category" htmlFor={ category.id }>
                  <button name={ category.id } type="button">
                    {category.name}
                  </button>

                </label>
              </li>))}
          </ul>
        </aside>
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
