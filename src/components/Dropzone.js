import React, { Component } from "react";
import ReactDropzone from "react-dropzone";
import FileInfos from "./FileInfos";
// import classNames from "classnames";

export default class Dropzone extends Component {
  constructor() {
    super();
    this.state = {
      file: { name: "" }
    };
    this.onDrop = this.onDrop.bind(this);
  }

  render() {
    return (
      <div>
        <ReactDropzone
          onDrop={this.onDrop}
          onFileDialogCancel={this.onCancel}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div {...getRootProps()} className="content__dropzone">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Déposer le rapport ici</p>
                ) : (
                  <p className="content__dropzone-text">
                    Glisser-déposer le rapport ici, ou cliquer pour sélectionner
                    le fichier à importer
                  </p>
                )}
              </div>
            );
          }}
        </ReactDropzone>
        <FileInfos file={this.state.file} />
      </div>
    );
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length > 0) {
      this.setState({ file: acceptedFiles[0] });
    }
    if (rejectedFiles.length > 0) {
      console.log("the following files were rejected", rejectedFiles); //TODO proper on-screen warning to user
    }
  };
}
