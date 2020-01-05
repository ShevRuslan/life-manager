import React from "react";
import "./App.css";

class App extends React.Component {
  handleTest = () => {
    fetch("/api/users", {
      method: "GET"
    })
      .then(response => response.json())
      .then(response => console.log(response));
  };
  render() {
    return (
      <div className="App">
        <button onClick={this.handleTest}>Тест</button>
      </div>
    );
  }
}

export default App;
  