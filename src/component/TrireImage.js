import React, { useState } from "react";
import ImageUploader from "./ImageUploader";

import Tesseract from "tesseract.js";

const TireImageApp = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [serialNumber, setSerialNumber] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const extractSerialNumber = async (image) => {
    await Tesseract.recognize(image, "eng", {
      logger: (m) => {
        console.log(m);

        setProgress(parseInt(m.progress * 100));
      },
    }).then((res) => {
      setSerialNumber(res.data.text);
     
    });

    
  };
  const handleImageUpload = (image) => {
    setUploadedImage(image);
    setError("");
    extractSerialNumber(image);
  };

  return (
    <div className="container">
      <h1>Extract Text from Image </h1>

      {progress > 0 && progress < 100 ? (
        <p style={{ textAlign: "center" }}> Processing {progress}%</p>
      ) : (
        <>
          {serialNumber === "" && (
            <ImageUploader onImageUpload={handleImageUpload} />
          )}

          {serialNumber && (
            <div className="Result-container">
              <h2>Extracted Serial Number</h2>
              <textarea rows={"30"} value={serialNumber} />
            </div>
          )}
        </>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default TireImageApp;
