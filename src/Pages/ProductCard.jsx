import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../services/api';

class ProductCard extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const item = await getProductsFromId(id);
    this.setState({ product: item });
    console.log(item);
  }

  render() {
    const { product } = this.state;
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
          Adicionar ao carrinho
        </Link>
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
};

export default ProductCard;
