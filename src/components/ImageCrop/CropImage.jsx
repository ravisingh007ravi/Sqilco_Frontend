import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

export default function CropImage({ imageSrc, onCropComplete, onCancel, onSave }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <div className="relative w-full h-[300px] bg-black rounded-md overflow-hidden">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        aspect={1}
        cropShape="round"
        showGrid={false}
      />
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-4">
        <button onClick={onSave} className="bg-green-500 px-4 py-2 rounded text-white">
          Save Crop
        </button>
        <button onClick={onCancel} className="bg-red-500 px-4 py-2 rounded text-white">
          Cancel
        </button>
      </div>
    </div>
  );
}
