import React from 'react';
import PDFReader from 'rn-pdf-reader-js'

const FilePreview = ({route}) => {
    return(
        <PDFReader
            source={{
                uri: route.params.fileData.fileURL
            }}
        />
    );
}

export default FilePreview;