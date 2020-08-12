import React from "react";

function Information({ name, what, list }) {
  return (
    <p>
      this is props {name}, {list}
    </p>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Study React</h1>
      <Information name="something" what={true} list={[1, 2, 3, 4]} />
    </div>
  );
}

export default App;
