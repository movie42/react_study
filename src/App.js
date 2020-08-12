import React from "react";
import PropTypes from "prop-types";

function Information({ name, picture, age }) {
  return (
    <div>
      <p>This is {name}</p>
      <p>I am {age}</p>
      <p>this is Image {picture}</p>
    </div>
  );
}

const arrayObject = [
  { id: 1, name: "JO", picture: "JOIMAGE", age: 32 },
  { id: 2, name: "KO", picture: "KOIMAGE", age: 32 },
  { id: 3, name: "CHIO", picture: "CHIOIMAGE", age: 33 },
];

Information.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

function App() {
  return (
    <div className="App">
      <h1>Study React</h1>
      {arrayObject.map((value) => (
        <Information
          key={value.id}
          name={value.name}
          picture={value.picture}
          age={value.age}
        />
      ))}
    </div>
  );
}

export default App;
