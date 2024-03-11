import React, { useEffect, useState } from "react";
import PdfViewer from "./pdfviewer";
import { useNavigate } from "react-router-dom";
import Near from "./near";
import axios from "axios";

export default function Report() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [clickedMessageId, setClickedMessageId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(localStorage.getItem('token'));
        let response = await axios.post("http://localhost:5000/report/myreport", { token: localStorage.getItem('token') });
        alert(response.data.data[0].message)
        setReports(response.data.data);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  const handlePdfViewerToggle = (messageId) => {
    setClickedMessageId(messageId === clickedMessageId ? null : messageId);
  };

  return (
    <>
      <div className="Title">.Report</div>
      <div className="chatbox">
        {reports.map((data) => (
          <div key={data._id}>
            <div className="message" key={data._id} onClick={() => handlePdfViewerToggle(data._id)}>Subject : {data.message}</div>
            {clickedMessageId === data._id && <PdfViewer pdfBase64={data.report} />}
          </div>
        ))}
      </div>
    </>
  );
}
