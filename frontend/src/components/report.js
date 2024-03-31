import React, { useEffect, useState } from "react";
import PdfViewer from "./pdfviewer";
import { useNavigate } from "react-router-dom";
import Near from "./near";
import axios from "axios";
import backendurl from "./backend";

export default function Report() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [clickedMessageId, setClickedMessageId] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(localStorage.getItem('token'));
        let response = await axios.post(`${backendurl}/report/myreport`, { token: localStorage.getItem('token') });
        setReports(response.data.data);
      } catch (error) {
        console.log(error);
        alert(error)
        navigate("/login");
      }
    };

    fetchData();
  }, []);
  const handlePdfViewerToggle = async (fileId) => {
    try {
      // Detect if the device is a mobile device
      const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
      let res = await axios.post(`${backendurl}/report/file`, { token: localStorage.getItem('token'), fileId });
 
      if (isMobileDevice) {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${res.data.data.data}`;
      link.download = 'document.pdf'; // Set the desired file name here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
 
      } else {
        setSelectedReport(res.data.data.data); // Store the PDF data in state
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleClosePdfViewer = () => {
    setSelectedReport(null); // Clear the selected report when close button is clicked
  };

  const handleDownloadPdf = () => {
    if (selectedReport) {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${selectedReport}`;
      link.download = 'document.pdf'; // Set the desired file name here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className="Title">.Report</div>
      <div className="chatbox">
        {reports.map((data) => (
          <div className="message" key={data._id} onClick={() => handlePdfViewerToggle(data.report)} >
           subject: {data.message}
          </div>
        ))}
      </div>
      {selectedReport && (
        <div className="pdfviewer">
          <button style={{ float: "right" }} onClick={handleClosePdfViewer}>Close</button>
          <button style={{ float: "right", marginRight: "10px" }} onClick={handleDownloadPdf}>Download PDF</button>
          <PdfViewer pdfBase64={selectedReport} />
        </div>
      )}
    </>
  );
}
