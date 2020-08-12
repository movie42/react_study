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
  { id: 1, name: "JO", picture: "JOIMAGE" },
  { id: 2, name: "KO", picture: "KOIMAGE" },
  { id: 3, name: "CHIO", picture: "CHIOIMAGE" },
];

function App() {
  return (
    <div className="App">
      <h1>Study React</h1>
      {arrayObject.map((value) => (
        <Information key={value.id} name={value.name} picture={value.picture} />
      ))}
    </div>
  );
}

export default App;
