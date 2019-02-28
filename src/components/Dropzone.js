import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDropzone from "react-dropzone";
import {
  getTotalNumberOfReports,
  sendArrayBufferToAPI
} from "../utils/apiUtils";
import { readFileAsArrayBuffer } from "../utils/fileUtils";

class Dropzone extends Component {
  constructor() {
    super();
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
      </div>
    );
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length > 0) {
      this.props.updateFile(acceptedFiles[0]);
      this.sendFileToServerAndGetNumberOfFiles(acceptedFiles[0]);
    }
    if (rejectedFiles.length > 0) {
      console.log("the following files were rejected", rejectedFiles); //TODO proper on-screen warning to user
    }
  };

  sendFileToServerAndGetNumberOfFiles = file => {
    readFileAsArrayBuffer(file)
      .then(sendArrayBufferToAPI)
      .then(getTotalNumberOfReports)
      .then(data => {
        this.props.updateNumberOfFilesOnServer(data.total);
      });
  };
}

const mapDispatchToProps = dispatch => ({
  updateFile: dispatch.file.updateFile,
  updateNumberOfFilesOnServer:
    dispatch.numberOfFilesOnServer.updateNumberOfFilesOnServer
});

export default connect(
  undefined,
  mapDispatchToProps
)(Dropzone);
