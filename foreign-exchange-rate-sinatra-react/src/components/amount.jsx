import React, { Component } from "react";

export default class Amount extends Component {
  render() {
    return (
      <div className="wrapper">
        <label>
          Amount:
          <input
            name="amount"
            type="number"
            value={this.props.value}
            onChange={this.props.onChange}
            className="form-control form-control-lg mb-2"
          />
        </label>
      </div>
    );
  }
}
