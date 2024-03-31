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
        let response = await axios.post("http://localhost:5000/report/myreport", { token: localStorage.getItem('token') });
        setReports(response.data.data);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  const handlePdfViewerToggle = async (fileId) => {
    try {
      let res = await axios.post(`${backendurl}/report/file`, { token: localStorage.getItem('token'), fileId });
      setSelectedReport(res.data.data.data); // Store the PDF data in state
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePdfViewer = () => {
    setSelectedReport(null); // Clear the selected report when close button is clicked
  };

  return (
    <>
      <div className="Title">.Report</div>
      <div className="chatbox">
        {reports.map((data) => (
          <div className="message" key={data._id} onClick={() => handlePdfViewerToggle(data.report)} >
            {data.message}
          </div>
        ))}
      </div>
      {selectedReport && (
        <div className="pdfviewer">
          <PdfViewer pdfBase64={selectedReport} />
          <button onClick={handleClosePdfViewer}>Close</button>
        </div>
      )}
    </>
  );
}
