export function readFileAsArrayBuffer(file) {
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
