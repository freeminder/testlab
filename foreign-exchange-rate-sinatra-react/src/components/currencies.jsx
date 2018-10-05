import React, { Component } from "react";

export default class Currencies extends Component {
  render() {
    return (
      <div className="wrapper">
        <label>
          {this.props.currency_type} Currency:
          <select
            value={this.props.value}
            onChange={this.props.onChange}
            className="custom-select custom-select-lg mb-2"
          >
            {this.props.currencies.map(currency => (
              <option key={currency}>{currency}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}
