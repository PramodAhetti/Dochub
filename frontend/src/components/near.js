import React, { useEffect, useRef } from "react";
import PdfViewer from "./pdfviewer";
const Near = (props) => {
  console.log(props.props.report);
  return (
    // <div className="postbox">
            
    //   <sub className="message">{" : " + props.props.message}</sub>
    //   <PdfViewer pdfBase64={props.props.report}></PdfViewer>
    // </div>
    <PdfViewer pdfBase64={props.props.report}></PdfViewer>
  );
};

export default Near;