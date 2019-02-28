import React, { Component } from "react";
import "./App.css";
import Dropzone from "./components/Dropzone";
import { connect } from "react-redux";
import FileInfos from "./components/FileInfos";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dropzone />
        <FileInfos
          file={this.props.file}
          numberOfFilesOnServer={this.props.numberOfFilesOnServer}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.file,
  numberOfFilesOnServer: state.numberOfFilesOnServer
});

export default connect(mapStateToProps)(App);
