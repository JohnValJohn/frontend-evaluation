import React, { Component } from "react";
import "./App.css";
import Dropzone from "./components/Dropzone";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dropzone />
      </div>
    );
  }
}

export default App;
