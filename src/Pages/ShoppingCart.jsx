import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const { ItemsCarrinho } = this.props;
    return (
      <div>
        {ItemsCarrinho.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (ItemsCarrinho.map((item) => (
          <div key={ item.id }>
            <div data-testid="product" className="div-category-item">
              <img src={ item.thumbnail } alt={ item.title } />
              <p data-testid="shopping-cart-product-name">{ item.title }</p>
              <h3>{ item.price }</h3>
              <p data-testid="shopping-cart-product-quantity">
                {
                  ItemsCarrinho.filter((element) => element.id === item.id).length
                }
              </p>
            </div>
          </div>)))}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  ItemsCarrinho: PropTypes.arrayOf(PropTypes.shape({ })).isRequired,
};

export default ShoppingCart;
