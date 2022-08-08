import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../services/api';

class ProductCard extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {},
      inputNumber: 0,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const item = await getProductsFromId(id);
    this.setState({ product: item });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { product, inputNumber } = this.state;
    const { salvaNoCarrinho } = this.props;
    return (
      <div>
        <p data-testid="product-detail-name">{ product.title }</p>
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <p data-testid="product-detail-price">{ product.price }</p>
        <Link
          data-testid="shopping-cart-button"
          to="/shoppingCart"
        >
          Shopping Cart
        </Link>
        <input
          onChange={ this.handleChange }
          value={ inputNumber }
          type="number"
          name="inputNumber"
        />
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => salvaNoCarrinho(product) }
          type="button"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  salvaNoCarrinho: PropTypes.func.isRequired,
};

export default ProductCard;
