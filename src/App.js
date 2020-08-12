import React from "react";

function Information({ name, picture }) {
  return (
    <div>
      <p>This is {name}</p>
      <p>this is Image {picture}</p>
    </div>
  );
}

const arrayObject = [
  {
    name: "JO",
    picture: "JOIMAGE",
  },
  {
    name: "KO",
    picture: "KOIMAGE",
  },
  {
    name: "CHIO",
    picture: "CHIOIMAGE",
  },
];

function App() {
  return (
    <div className="App">
      <h1>Study React</h1>
      {arrayObject.map((value) => (
        <Information name={value.name} picture={value.picture} />
      ))}
    </div>
  );
}

export default App;
