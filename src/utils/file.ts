export const prettyPrintBytes = (size: number): string => {
  const units = ['B', 'KB', 'MB'];
  let s = size;
  for (const unit of units) {
    if (s < 1000) {
      return s.toFixed(0) + unit;
    }
    s /= 1024;
  }
  return s.toFixed(0) + 'GB';
};

// export function DataURIToBlob(dataURI: string) {
//   const splitDataURI = dataURI.split(',');
//   const byteString =
//     splitDataURI[0].indexOf('base64') >= 0
//       ? atob(splitDataURI[1])
//       : decodeURI(splitDataURI[1]);
//   const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

//   const ia = new Uint8Array(byteString.length);
//   for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

//   return new Blob([ia], { type: mimeString });
// }

export function convertBase64ToFile(base64Img: string) {
  // Replace the following with your actual Base64-encoded string
  var base64String = base64Img;

  // Extract the content type and data from the Base64 string
  var contentType = base64String.match(/^data:(.*?);/)[1];
  var base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

  // Convert the Base64 data to a binary blob
  var binaryData = atob(base64Data);

  // Create a Uint8Array from the binary data
  var uint8Array = new Uint8Array(binaryData.length);
  for (var i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array
  var blob = new Blob([uint8Array], { type: contentType });

  // Create a File from the Blob
  var file = new File([blob], 'thumbnail', { type: contentType });
  return file;
}
