import React from 'react';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      contentCart: [],
    };
  }

  render() {
    const { contentCart } = this.state;
    return (
      <div>
        {contentCart.length === 0
        && <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </div>
    );
  }
}

export default ShoppingCart;
