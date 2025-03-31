import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";

const Contact = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const inputRef = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const getCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const handleUpload = async () => {
    const croppedImageBlob = await getCroppedImage();
    if (!croppedImageBlob) return alert("Crop the image first!");

    const formData = new FormData();
    formData.append("image", croppedImageBlob, "cropped-image.jpg");

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black h-screen text-white">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current.click()}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Choose Image
      </button>

      {imageSrc && (
        <div className="relative w-[300px] h-[300px]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            aspect={1}
            cropShape="round"
            showGrid={false}
          />
        </div>
      )}

      {imageSrc && (
        <div className="mt-4 flex gap-4">
          <button onClick={() => setRotation((prev) => prev + 90)} className="bg-gray-700 px-4 py-2 rounded">
            Rotate
          </button>
          <button onClick={handleUpload} className="bg-green-500 px-4 py-2 rounded">
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;
