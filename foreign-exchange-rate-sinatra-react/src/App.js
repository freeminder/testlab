import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 100,
      base_currency: "USD",
      foreign_currency: "EUR",
      base_currencies: [],
      foreign_currencies: [],
      return_message: ""
    };
    this.handleAChange = this.handleAChange.bind(this);
    this.handleBCChange = this.handleBCChange.bind(this);
    this.handleFCChange = this.handleFCChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5100/currencies_list`)
      .then(res => {
        const base_currencies = res.data;
        const foreign_currencies = res.data;
        this.setState({
          base_currencies,
          foreign_currencies
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleAChange(e) {
    this.setState({ amount: e.target.value });
  }

  handleBCChange(e) {
    this.setState({ base_currency: e.target.value });
  }

  handleFCChange(e) {
    this.setState({ foreign_currency: e.target.value });
  }

  handleClick = () => {
    const params = new URLSearchParams();
    params.append("base_currency", this.state.base_currency);
    params.append("foreign_currency", this.state.foreign_currency);
    params.append("amount", this.state.amount);
    axios
      .post("http://localhost:5100/api", params)
      .then(response => this.setState({ return_message: response.data }))
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <p>Foreign Exchange Rate</p>
        <select value={this.state.base_currency} onChange={this.handleBCChange}>
          {this.state.base_currencies.map(base_currency => (
            <option key={base_currency}>{base_currency}</option>
          ))}
        </select>
        <select
          value={this.state.foreign_currency}
          onChange={this.handleFCChange}
        >
          {this.state.foreign_currencies.map(foreign_currency => (
            <option key={foreign_currency}>{foreign_currency}</option>
          ))}
        </select>
        <label>
          Amount:
          <input
            name="amount"
            type="number"
            value={this.state.amount}
            onChange={this.handleAChange}
          />
        </label>
        <button onClick={this.handleClick}>Get Rate</button>
        {this.state.return_message.status === "success" && (
          <p>{this.state.return_message.total}</p>
        )}
      </div>
    );
  }
}

export default App;
