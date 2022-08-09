import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../services/api';

class ProductCard extends React.Component {
  constructor() {
    super();

    if (JSON.parse(localStorage.getItem('completeComent'))) {
      this.state = {
        completeComent: [...JSON.parse(localStorage.getItem('completeComent'))],
        product: {},
        inputNumber: 0,
        textArea: '',
        inputEmail: '',
        avaliattion: '',
      };
    } else {
      this.state = {
        product: {},
        inputNumber: 0,
        textArea: '',
        inputEmail: '',
        avaliattion: '',
        completeComent: [],
      };
    }
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const item = await getProductsFromId(id);
    this.setState({
      product: item,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleChangeRadios = ({ target: { value } }) => {
    this.setState({ avaliattion: value });
  };

  renderComent = () => {
    const { inputEmail, textArea, avaliattion } = this.state;
    const coment = {
      email: inputEmail,
      avaliacao: avaliattion,
      comentario: textArea,
    };
    this.setState((prevState) => ({
      completeComent: [...prevState.completeComent, coment],
      textArea: '',
      inputEmail: '',
      avaliattion: '',
    }));
  }

  render() {
    const { product, inputNumber, inputEmail, textArea, completeComent } = this.state;
    const { salvaNoCarrinho } = this.props;
    localStorage.setItem('completeComent', JSON.stringify(completeComent));
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
        <form>
          <input
            data-testid="product-detail-email"
            onChange={ this.handleChange }
            value={ inputEmail }
            type="email"
            name="inputEmail"
          />
          <label htmlFor="avaliattion">
            Avaliação
            <input
              data-testid="1-rating"
              onChange={ this.handleChangeRadios }
              value="1"
              id="1"
              type="radio"
              name="avaliattion"
            />
            1
            <input
              data-testid="2-rating"
              onChange={ this.handleChangeRadios }
              value="2"
              id="2"
              type="radio"
              name="avaliattion"
            />
            2
            <input
              data-testid="3-rating"
              onChange={ this.handleChangeRadios }
              value="3"
              id="3"
              type="radio"
              name="avaliattion"
            />
            3
            <input
              data-testid="4-rating"
              onChange={ this.handleChangeRadios }
              value="4"
              id="4"
              type="radio"
              name="avaliattion"
            />
            4
            <input
              data-testid="5-rating"
              onChange={ this.handleChangeRadios }
              value="5"
              type="radio"
              name="avaliattion"
            />
            5
          </label>
          <textarea
            data-testid="product-detail-evaluation"
            onChange={ this.handleChange }
            value={ textArea }
            name="textArea"
            cols="30"
            rows="10"
          />
          <button
            onClick={ this.renderComent }
            data-testid="submit-review-btn"
            type="button"
          >
            Avaliar
          </button>
        </form>
        <div>
          {completeComent.map((coment) => (
            <div key={ coment.email }>
              <p data-testid="review-card-email">{ coment.email }</p>
              <input
                data-testid="1-rating"
                type="radio"
                name=""
                value="1"
                checked={ coment.avaliacao === '1' }
              />
              <input
                data-testid="2-rating"
                type="radio"
                name=""
                value="2"
                checked={ coment.avaliacao === '2' }
              />
              <input
                data-testid="3-rating"
                type="radio"
                name=""
                value="3"
                checked={ coment.avaliacao === '3' }
              />
              <input
                data-testid="4-rating"
                type="radio"
                name=""
                value="4"
                checked={ coment.avaliacao === '4' }
              />
              <input
                data-testid="5-rating"
                type="radio"
                name=""
                value="5"
                checked={ coment.avaliacao === '5' }
              />
              <p data-testid="product-detail-evaluation">{ coment.comentario }</p>
            </div>
          ))}
        </div>
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
