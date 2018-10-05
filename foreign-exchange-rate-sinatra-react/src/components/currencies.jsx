import React, { Component } from "react";

export default class Currencies extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <label>
          {this.props.currency_type} Currency:
          <select value={this.props.value} onChange={this.props.onChange}>
            {this.props.currencies.map(currency => (
              <option key={currency}>{currency}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}
