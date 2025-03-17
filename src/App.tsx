import React, { useRef, useState } from "react";
import "./App.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Alert, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
function SlidePreview() {
  const [content, setContent] = useState("ADD CONTENT");
  const [name, setName] = useState("Your name");
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFileName, setSelectedFileName] = useState("No file selected");

  const [backgroundColor, setBackgroundColor] = useState("#00a6a6");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(18);
  const [textColor, setTextColor] = useState("#000000");

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
      <div className="slide-actions">
        <div className="slide-group">
          <button className="slide-previous">
            <ArrowBackIosNewIcon />
          </button>
          <div className="slide" style={{ backgroundColor: backgroundColor }}>
            <div className="profile">
              <img
                className="profile-icon"
                src={
                  typeof profileImage === "string"
                    ? profileImage
                    : "/src/assets/profile.png"
                }
              />
              <p
                className="profile-name"
                style={{
                  fontSize: 14,
                  color: textColor,
                }}
              >
                {name}
              </p>
            </div>
            <div
              className="content"
              style={{
                fontFamily: fontFamily,
                fontSize: `${fontSize}px`,
                color: textColor,
              }}
            >
              {content}
            </div>
          </div>
          <button className="slide-next">
            <ArrowForwardIosIcon />
          </button>
        </div>

        <div className="slide-add">
          <Button
            variant="contained"
            color="success"
            startIcon={<AddCircleIcon />}
          >
            <span
              style={{
                fontSize: "1rem",
              }}
            >
              Add slide
            </span>
          </Button>
        </div>
      </div>

      <div className="slide-input">
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
            <Alert
              variant="outlined"
              severity={profileImage ? "success" : "error"}
            >
              Selected File : {selectedFileName}
            </Alert>
            <span></span>
          </div>
        </div>
        <div className="slide-style">
          <h3 style={{ color: "green", marginBottom: 5 }}>UI Styling</h3>

          <div className="slide-controls">
            <div className="slide-color">
              <label>
                <span className="label-text">Background color</span>
                <input
                  style={{
                    width: "100%",
                  }}
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </label>

              <label>
                <span className="label-text">Text color</span>
                <input
                  style={{
                    width: "100%",
                  }}
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </label>
            </div>

            <label>
              <span className="label-text">Font Family</span>
              <select
                style={{
                  backgroundColor: "lightgray",
                  padding: "5px",
                  border: "none",
                  marginBottom: "10px",
                  height: "30px",
                  width: "40%",
                  color: "black",
                }}
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
              >
                <option value="Roboto">Roboto</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
            </label>

            <label>
              <span className="label-text">Font Size</span>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </label>
          </div>
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
