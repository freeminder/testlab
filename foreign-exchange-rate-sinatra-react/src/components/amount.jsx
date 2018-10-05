import React, { Component } from "react";

export default class Amount extends Component {
  render() {
    return (
      <div>
        <label>
          Amount:
          <input
            name="amount"
            type="number"
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </label>
      </div>
    );
  }
}
