import React from 'react';
import PDFReader from 'rn-pdf-reader-js'

const FilePreview = ({route}) => {
    console.log(route.params.fileData.fileURL);
    return(
        <PDFReader
            withPinchZoom
            source={{
                uri: route.params.fileData.fileURL
            }}
        />
    );
}

export default FilePreview;