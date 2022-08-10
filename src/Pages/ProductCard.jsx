import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../services/api';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = this.props;

    if (JSON.parse(localStorage.getItem(id))) {
      this.state = {
        completeComent: [...JSON.parse(localStorage.getItem(id))],
        product: {},
        inputNumber: 0,
        textArea: '',
        inputEmail: '',
        avaliattion: '',
        inputPass: false,
      };
    } else {
      this.state = {
        product: {},
        inputNumber: 0,
        textArea: '',
        inputEmail: '',
        avaliattion: '',
        completeComent: [],
        inputPass: false,
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
    if (inputEmail.includes('@') && inputEmail.includes('.com') && avaliattion !== '') {
      this.setState((prevState) => ({
        completeComent: [...prevState.completeComent, coment],
        textArea: '',
        inputEmail: '',
        avaliattion: '',
        inputPass: false,
      }));
    } else {
      this.setState({
        inputPass: true,
      });
    }
  }

  render() {
    const { product, inputNumber, inputEmail,
      textArea, completeComent, inputPass } = this.state;
    const { salvaNoCarrinho, itemsCarrinho } = this.props;
    localStorage.setItem(product.id, JSON.stringify(completeComent));
    return (
      <div>
        <p data-testid="product-detail-name">{ product.title }</p>
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <p data-testid="product-detail-price">{ product.price }</p>
        <div>
          <p data-testid="shopping-cart-size">{ itemsCarrinho.length }</p>
          <Link
            data-testid="shopping-cart-button"
            to="/shoppingCart"
          >
            Shopping Cart
          </Link>
        </div>
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
          <label htmlFor="inputEmail">
            Email
            <input
              data-testid="product-detail-email"
              onChange={ this.handleChange }
              value={ inputEmail }
              type="email"
              name="inputEmail"
            />
          </label>
          <label htmlFor="avaliattion">
            Avaliação
            <label htmlFor="1">
              <input
                data-testid="1-rating"
                onChange={ this.handleChangeRadios }
                value="1"
                id="1"
                type="radio"
                name="avaliattion"
              />
              1
            </label>
            <label htmlFor="2">
              <input
                data-testid="2-rating"
                onChange={ this.handleChangeRadios }
                value="2"
                id="2"
                type="radio"
                name="avaliattion"
              />
              2
            </label>
            <label htmlFor="3">
              <input
                data-testid="3-rating"
                onChange={ this.handleChangeRadios }
                value="3"
                id="3"
                type="radio"
                name="avaliattion"
              />
              3
            </label>
            <label htmlFor="4">
              <input
                data-testid="4-rating"
                onChange={ this.handleChangeRadios }
                value="4"
                id="4"
                type="radio"
                name="avaliattion"
              />
              4
            </label>
            <label htmlFor="5">
              <input
                data-testid="5-rating"
                onChange={ this.handleChangeRadios }
                value="5"
                type="radio"
                name="avaliattion"
              />
              5
            </label>
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
          { inputPass && <p data-testid="error-msg">Campos inválidos</p> }
          {completeComent.map((coment) => (
            <div key={ coment.email }>
              <p data-testid="review-card-email">{ coment.email }</p>
              <label data-testid="review-card-rating" htmlFor="radio-review">
                <input
                  type="radio"
                  name="radio-review"
                  value="1"
                  checked={ coment.avaliacao === '1' }
                />
                1
                <input
                  type="radio"
                  name="radio-review"
                  value="2"
                  checked={ coment.avaliacao === '2' }
                />
                2
                <input
                  type="radio"
                  name="radio-review"
                  value="3"
                  checked={ coment.avaliacao === '3' }
                />
                3
                <input
                  type="radio"
                  name="radio-review"
                  value="4"
                  checked={ coment.avaliacao === '4' }
                />
                4
                <input
                  type="radio"
                  name="radio-review"
                  value="5"
                  checked={ coment.avaliacao === '5' }
                />
                5
              </label>
              <p data-testid="review-card-evaluation">{ coment.comentario }</p>
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
  itemsCarrinho: PropTypes.number.isRequired,
};

export default ProductCard;
