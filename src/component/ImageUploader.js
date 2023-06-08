import React, { useState } from "react";

const ImageUploader = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      onImageUpload(selectedImage);
    }
  };

  return (
    <div className="image-upload">
      <label htmlFor="file-upload" className="file-input-label">
        Select Image
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input"
      />

      {selectedImage && (
        <div className="selected-image">
          <img src={selectedImage} alt="Selected Tire" />
          <div className="selected-image-btn-container">
          <button onClick={handleUpload}>Process</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
