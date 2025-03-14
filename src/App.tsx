import React, { useRef, useState } from "react";
import "./App.css";

function SlidePreview() {
  const [content, setContent] = useState("ADD CONTENT");
  const [name, setName] = useState("Your name");
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFileName, setSelectedFileName] = useState("No file selected");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload correct file");
        return;
      }

      if (file.size > 5 * 1025 * 1024) {
        alert("Please upload file less than 5MB.");
        return;
      }

      setSelectedFileName(file.name);

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setProfileImage(reader.result);
      };
    }
  };

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    fileInputRef.current?.click();
  }

  return (
    <div className="slide-box">
      <div className="slide">
        <div className="profile">
          <img
            className="profile-icon"
            src={
              typeof profileImage === "string"
                ? profileImage
                : "/src/assets/profile.png"
            }
          />
          <p className="profile-name">{name}</p>
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="text-box">
        <label>
          <span className="label-text">Content</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        <label>
          <span className="label-text">Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <div className="image-upload">
          <label>
            <span className="label-text">Upload image</span>

            <button onClick={handleClick} className="upload-image">
              Upload
            </button>

            <input
              type="file"
              onChange={handleChange}
              ref={fileInputRef}
              hidden
            />
          </label>
        </div>

        <div className="selected-file">
          <span>Selected File : {selectedFileName}</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <SlidePreview />
    </div>
  );
}
