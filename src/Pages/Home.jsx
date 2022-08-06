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
  };

  searchCategorie = async (category) => {
    const itemsCategories = await getProductsFromCategoryAndQuery(category, '');
    this.setState({
      itemsSearched: itemsCategories.results });
  }

  render() {
    const { searchBar, listCategories, itemsSearched } = this.state;
    return (
      <div className="container-home">
        <header className="container-header-home">
          <Link data-testid="shopping-cart-button" to="/shoppingCart">ShoppingCart</Link>
          <form className="forms-header-home">
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
        </header>
        <div className="container-section-aside">
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
          <section className="container-section">
            { itemsSearched.length === 0 ? <p>Nenhum produto foi encontrado</p>
              : (itemsSearched.map((item) => (
                <div key={ item.id } data-testid="product" className="div-category-item">
                  <img src={ item.thumbnail } alt={ item.title } />
                  <p>{ item.title }</p>
                  <h3>{ item.price }</h3>
                </div>
              )))}
          </section>
        </div>
      </div>
    );
  }
}

export default Home;
