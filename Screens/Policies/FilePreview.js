import React from "react";
import PDFReader from "rn-pdf-reader-js";

// Uses the route fileData variable passed from Policies page
const FilePreview = ({ route }) => {
  return (
    // Displays the PDF using PDFReader component, supplying it with a uri
    <PDFReader
      withPinchZoom
      source={{
        uri: route.params.fileData.fileURL,
      }}
    />
  );
};

export default FilePreview;
