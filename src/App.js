import React from "react";
import PropTypes from "prop-types";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("WOW");
  }

  // The Reason I use state, because the data is change.
  state = {
    count: 0,
  };

  add = () => {
    // I can't mutate state directly. So I use setState.
    this.setState((current) => ({
      count: current.count + 1,
    }));
  };
  minus = () => {
    this.setState((current) => ({
      count: current.count - 1,
    }));
  };

  componentDidMount() {
    console.log("Component render");
  }
  componentDidUpdate() {
    console.log("update");
  }
  // this is not a function so it has render()
  render() {
    console.log("render");
    return (
      <div>
        <h1>change Data : {this.state.count} </h1>
        <button onClick={this.add}>+</button>
        <button onClick={this.minus}>-</button>
      </div>
    );
  }
}

export default App;
