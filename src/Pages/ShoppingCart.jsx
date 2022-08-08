import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const { ItemsCarrinho, itemsShow,
      increaseButton, decreaseButton, removeItem } = this.props;
    return (
      <div>
        {ItemsCarrinho.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (itemsShow.map((item) => (
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
              <button
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ () => decreaseButton(item) }
              >
                -
              </button>
              <button
                data-testid="product-increase-quantity"
                type="button"
                onClick={ () => increaseButton(item) }
              >
                +
              </button>
              <button
                type="button"
                data-testid="remove-product"
                onClick={ () => removeItem(item) }
              >
                Remover
              </button>
            </div>
          </div>)))}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  ItemsCarrinho: PropTypes.arrayOf(PropTypes.shape({ })).isRequired,
  itemsShow: PropTypes.arrayOf(PropTypes.shape({ })).isRequired,
  increaseButton: PropTypes.func.isRequired,
  decreaseButton: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default ShoppingCart;
