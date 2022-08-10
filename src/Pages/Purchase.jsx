import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Purchase extends Component {
  constructor() {
    super();
    this.state = {
      bag: [],
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      adress: '',
      ticket: false,
      visa: false,
      master: false,
      elo: false,
      error: false,
    };
  }

  componentDidMount() {
    this.setState({
      bag: [...JSON.parse(localStorage.getItem('produtos'))],
    });
  }

  handleChange = ({ target }) => {
    const arr = ['ticket', 'visa', 'master', 'elo'];
    const arr1 = arr.map((pay) => pay === target.id);
    if (target.type === 'radio') {
      this.setState({
        ticket: arr1[0],
        visa: arr1[1],
        master: arr1[2],
        elo: arr1[3],
      });
    } else {
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
    }
  }

  handleClick = () => {
    const { fullName, email, cpf, phone, cep,
      adress, ticket, visa, master, elo } = this.state;
    const test = ticket || visa || master || elo;
    if (!fullName || !email || !cpf || !phone || !cep || !adress || !test) {
      this.setState({
        error: true,
      });
    } else {
      this.setState({
        error: false,
      });
      localStorage.setItem('produtos', JSON.stringify([]));
      localStorage.setItem('produtosMostrados', JSON.stringify([]));
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { bag, fullName, email, cpf, phone, cep,
      adress, ticket, visa, master, elo, error } = this.state;
    return (
      <div>
        { bag.map((item) => (
          <div key={ item.id } className="div-category-item">
            <img src={ item.thumbnail } alt={ item.title } />
            <p data-testid="shopping-cart-product-name">{ item.title }</p>
            <h3>{ item.price }</h3>
          </div>
        ))}
        <form>
          <input
            onChange={ this.handleChange }
            value={ fullName }
            data-testid="checkout-fullname"
            type="text"
            name="fullName"
            id=""
            placeholder="Nome"
          />
          <input
            onChange={ this.handleChange }
            value={ email }
            data-testid="checkout-email"
            type="email"
            name="email"
            id=""
            placeholder="Email"
          />
          <input
            onChange={ this.handleChange }
            value={ cpf }
            data-testid="checkout-cpf"
            type="text"
            name="cpf"
            placeholder="CPF"
          />
          <input
            onChange={ this.handleChange }
            value={ phone }
            data-testid="checkout-phone"
            type="text"
            name="phone"
            placeholder="Telefone"
          />
          <input
            onChange={ this.handleChange }
            value={ cep }
            data-testid="checkout-cep"
            type="text"
            name="cep"
            placeholder="CEP"
          />
          <input
            onChange={ this.handleChange }
            value={ adress }
            data-testid="checkout-address"
            type="text"
            name="adress"
            placeholder="Endereço"
          />
          <label htmlFor="payment">
            <label htmlFor="ticket">
              Ticket
              <input
                onClick={ this.handleChange }
                data-testid="ticket-payment"
                type="radio"
                name="payment"
                id="ticket"
                checked={ ticket }
              />
            </label>
            <label htmlFor="visa">
              Visa
              <input
                onClick={ this.handleChange }
                data-testid="visa-payment"
                type="radio"
                name="payment"
                id="visa"
                checked={ visa }
              />
            </label>
            <label htmlFor="master">
              Master
              <input
                onClick={ this.handleChange }
                data-testid="master-payment"
                type="radio"
                name="payment"
                id="master"
                checked={ master }
              />
            </label>
            <label htmlFor="elo">
              Elo
              <input
                onClick={ this.handleChange }
                data-testid="elo-payment"
                type="radio"
                name="payment"
                id="elo"
                checked={ elo }
              />
            </label>
          </label>
        </form>
        <button
          onClick={ this.handleClick }
          data-testid="checkout-btn"
          type="button"
        >
          Batata

        </button>
        { error && <p data-testid="error-msg">Campos inválidos</p>}
      </div>

    );
  }
}

Purchase.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Purchase;
