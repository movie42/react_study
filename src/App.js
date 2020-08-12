import React from "react";
import PropTypes from "prop-types";

class App extends React.Component {
  // The Reason I use state, because the data is change.
  state = {
    count: 0,
  };

  add = () => {
    console.log("add");
  };
  minus = () => {
    console.log("minus");
  };

  // this is not a function so it has render()
  render() {
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
