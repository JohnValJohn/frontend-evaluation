import React, { Component } from "react";

export default class FileInfos extends Component {
  render() {
    const showNumberOfFiles = this.props.numberOfFilesOnServer !== null;
    const showFileName = this.props.file.name !== "";
    return (
      <div className="content__file-info">
        {showFileName && (
          <div className="content__file-info-unit">
            <span className="content__file-info-key">
              Nom du fichier sélectionné :
            </span>
            <span className="content__file-info-value">
              {this.props.file.name}
            </span>
          </div>
        )}

        {showNumberOfFiles && (
          <div className="content__file-info-unit">
            <span className="content__file-info-key">
              Nombre total de fichiers sur le serveur :
            </span>
            <span className="content__file-info-value">
              {this.props.numberOfFilesOnServer}
            </span>
          </div>
        )}
      </div>
    );
  }
}
