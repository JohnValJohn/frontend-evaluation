import React, { Component } from "react";

export default class FileInfos extends Component {
  render() {
    return <div>{this.props.file.name}</div>;
  }
}
