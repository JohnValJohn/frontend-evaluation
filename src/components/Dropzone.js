import React, { Component } from "react";
import ReactDropzone from "react-dropzone";
import FileInfos from "./FileInfos";

export default class Dropzone extends Component {
  constructor() {
    super();
    this.state = {
      file: { name: "" },
      binaryFile: {}
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
      console.log(acceptedFiles[0]);
      this.setState({ file: acceptedFiles[0] });
      this.getArrayBuffer(acceptedFiles[0])
        .then(arrayBuffer => {
          const url = "https://fhirtest.uhn.ca/baseDstu3/Binary";
          console.log("finished reading");
          console.log(arrayBuffer);
          fetch(url, { method: "POST", body: arrayBuffer })
            .then(response => {
              console.log("post ok");
            })
            .catch(error => console.log("there was an error posting"));
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (rejectedFiles.length > 0) {
      console.log("the following files were rejected", rejectedFiles); //TODO proper on-screen warning to user
    }
  };

  getArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onabort = () => {
        reject("file reading aborted");
      };
      reader.onerror = () => {
        reject("error reading file");
      };
      reader.readAsArrayBuffer(file);
    });
  }
}
