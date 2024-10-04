import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue || 0,
    };
  }

  increment = () => {
    this.setState((prevState) => ({
      value: prevState.value + 1,
    }));
  };

  decrement = () => {
    this.setState((prevState) => ({
      value: prevState.value - 1,
    }));
  };

  render() {
    return React.createElement(
      "div",
      {},
      React.createElement("button", { 'data-cy':'decrement-button', onClick: this.decrement }, "-"),
      React.createElement("span", {'data-cy': 'counter-value'}, ` ${this.state.value} `),
      React.createElement("button", { 'data-cy':'increment-button', onClick: this.increment }, "+")
    );
  }
}

export default Counter;
