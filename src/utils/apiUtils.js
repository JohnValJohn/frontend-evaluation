export function getTotalNumberOfReports() {
  return new Promise((resolve, reject) => {
    fetch("https://fhirtest.uhn.ca/baseDstu3/Binary?_summary=count", {
      method: "GET"
    })
      .then(response => {
        response
          .json()
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(
              "there was a problem converting the response to json: " + error
            );
          });
      })
      .catch(error => {
        reject("there was a problem getting the number of reports: " + error);
      });
  });
}

export function sendArrayBufferToAPI(arrayBuffer) {
  return new Promise((resolve, reject) => {
    const url = "https://fhirtest.uhn.ca/baseDstu3/Binary";
    fetch(url, { method: "POST", body: arrayBuffer })
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        reject("error while posting: " + error);
      });
  });
}
