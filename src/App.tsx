import React, { useRef, useState } from "react";
import "./App.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Fab,
  Pagination,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Download } from "@mui/icons-material";

interface Slide {
  content: string;
  name: string;
  profileImage: string | null;
  backgroundColor: string;
  fontFamily: string;
  fontSize: number;
  textColor: string;
  selectedFileName: string;
}

function SlidePreview() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([
    {
      content: "ADD CONTENT",
      name: "Your name",
      profileImage: null,
      backgroundColor: "#00a6a6",
      fontFamily: "Arial",
      fontSize: 18,
      textColor: "#000000",
      selectedFileName: "No file selected",
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateSlide = (index: number, updates: Partial<Slide>) => {
    setSlides((prev) =>
      prev.map((slide, i) => (i === index ? { ...slide, ...updates } : slide))
    );
  };

  const downloadPdf = () => {};

  const addSlide = () => {
    if (slides.length >= 5) {
      alert("You can add only 5 slides");
      return;
    }

    setSlides([
      ...slides,
      {
        content: "ADD CONTENT",
        name: "Your name",
        profileImage: null,
        backgroundColor: "#00a6a6",
        fontFamily: "Arial",
        fontSize: 18,
        textColor: "#000000",
        selectedFileName: "No file selected",
      },
    ]);
    setCurrentSlide(slides.length);
  };

  const changeSlide = (direction: "next" | "prev") => {
    setCurrentSlide((prev) =>
      direction === "next"
        ? (prev + 1) % slides.length
        : (prev - 1 + slides.length) % slides.length
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (
      file &&
      file.type.startsWith("image/") &&
      file.size <= 5 * 1024 * 1024
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        updateSlide(currentSlide, {
          profileImage: reader.result as string,
          selectedFileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file less than 5MB.");
    }
  };

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    fileInputRef.current?.click();
  }

  return (
    <div className="slide-box">
      <div className="slide-actions">
        <div className="slide-pagination">
          <Pagination
            count={slides.length}
            page={currentSlide + 1}
            onChange={(_, page) => setCurrentSlide(page - 1)}
          />{" "}
        </div>
        <div className="slide-group">
          <button
            onClick={() => changeSlide("prev")}
            className="slide-previous"
            disabled={currentSlide === 0}
            aria-label="previous"
          >
            <ArrowBackIosNewIcon />
          </button>

          <Card
            className="slide"
            style={{ backgroundColor: slides[currentSlide].backgroundColor }}
          >
            <CardHeader
              avatar={<Avatar src={slides[currentSlide].profileImage || ""} />}
              title={slides[currentSlide].name}
              slotProps={{
                title: {
                  style: {
                    fontSize: 14,
                    color: slides[currentSlide].textColor,
                  },
                },
              }}
            />
            <CardContent
              className="content"
              style={{
                fontFamily: slides[currentSlide].fontFamily,
                fontSize: `${slides[currentSlide].fontSize}px`,
                color: slides[currentSlide].textColor,
              }}
            >
              <Typography
                sx={{
                  fontFamily: slides[currentSlide].fontFamily,
                  fontSize: `${slides[currentSlide].fontSize}px`,
                  color: slides[currentSlide].textColor,
                }}
              >
                {slides[currentSlide].content}
              </Typography>
            </CardContent>
          </Card>
          <button
            onClick={() => changeSlide("next")}
            className="slide-next"
            disabled={currentSlide === slides.length - 1}
            aria-label="next"
          >
            <ArrowForwardIosIcon />
          </button>
        </div>

        <div className="slide-add">
          <Button
            variant="contained"
            color="success"
            onClick={addSlide}
            disabled={slides.length >= 5}
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
              value={slides[currentSlide].content}
              onChange={(e) =>
                updateSlide(currentSlide, { content: e.target.value })
              }
            />
          </label>

          <label>
            <span className="label-text">Name</span>
            <input
              value={slides[currentSlide].name}
              onChange={(e) =>
                updateSlide(currentSlide, { name: e.target.value })
              }
            />
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
              severity={slides[currentSlide].profileImage ? "success" : "error"}
            >
              Selected File : {slides[currentSlide].selectedFileName}
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
                  value={slides[currentSlide].backgroundColor}
                  onChange={(e) =>
                    updateSlide(currentSlide, {
                      backgroundColor: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                <span className="label-text">Text color</span>
                <input
                  style={{
                    width: "100%",
                  }}
                  type="color"
                  value={slides[currentSlide].textColor}
                  onChange={(e) =>
                    updateSlide(currentSlide, { textColor: e.target.value })
                  }
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
                value={slides[currentSlide].fontFamily}
                onChange={(e) =>
                  updateSlide(currentSlide, { fontFamily: e.target.value })
                }
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
                value={slides[currentSlide].fontSize}
                onChange={(e) =>
                  updateSlide(currentSlide, {
                    fontSize: Number(e.target.value),
                  })
                }
              />
            </label>
          </div>
        </div>
      </div>
      <Fab
        color="primary"
        aria-label="Download"
        onClick={downloadPdf}
        sx={{ position: "absolute", bottom: 35, right: 35 }}
      >
        <Download />
      </Fab>
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
