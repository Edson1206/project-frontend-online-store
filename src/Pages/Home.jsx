import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchBar: '',
      listCategories: [],
      itemsSearched: [],
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

  searchItems = async () => {
    const { searchBar } = this.state;
    const items = await getProductsFromCategoryAndQuery('', searchBar);
    this.setState({ itemsSearched: items.results });
    console.log(items);
  };

  render() {
    const { searchBar, listCategories, itemsSearched } = this.state;
    // console.log(listCategories);
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
            data-testid="query-input"
            onChange={ this.handleChange }
            name="searchBar"
            value={ searchBar }
            type="text"
          />
          <button
            onClick={ this.searchItems }
            data-testid="query-button"
            type="button"
          >
            Pesquisar
          </button>
          { !searchBar && (
            <h2 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h2>) }
        </form>
        { itemsSearched.length === 0 ? <p>Nenhum produto foi encontrado</p>
          : (itemsSearched.map((item) => (
            <div data-testid="product" key={ item.id }>
              <p>{ item.title }</p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{ item.price }</p>
            </div>
          )))}
      </div>
    );
  }
}

export default Home;
