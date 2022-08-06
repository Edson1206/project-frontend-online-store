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
      categoriesSearched: [],
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
  };

  searchCategorie = async (category) => {
    const itemsCategories = await getProductsFromCategoryAndQuery(category, '');
    this.setState({
      categoriesSearched: itemsCategories.results });
  }

  render() {
    const { searchBar, listCategories, itemsSearched, categoriesSearched } = this.state;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/shoppingCart">ShoppingCart</Link>
        <aside>
          <ul>
            {listCategories.map((category) => (
              <li key={ category.id }>
                <label htmlFor={ category.id }>
                  <button
                    data-testid="category"
                    name={ category.id }
                    type="button"
                    onClick={ () => this.searchCategorie(category.id) }
                  >
                    {category.name}
                  </button>
                </label>
              </li>))}
          </ul>
        </aside>
        <section>
          { categoriesSearched.map((itemCategory) => (
            <div key={ itemCategory.id } data-testid="product">
              <p>{itemCategory.title}</p>
              <img
                src={ itemCategory.thumbnail }
                alt={ itemCategory.title }
              />
              <p>
                { itemCategory.price }
              </p>
            </div>
          ))}
        </section>
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
            <div key={ item.id } data-testid="product">
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
