import React, { useRef, useState } from "react";
import "./App.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Alert, Button, Fab, Pagination } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Download } from "@mui/icons-material";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
});

Font.register({
  family: "Abel",
  src: "http://fonts.gstatic.com/s/abel/v6/N59kklKPso9WzbZH9jwJSg.ttf",
});

Font.register({
  family: "Abril Fatface",
  src: "http://fonts.gstatic.com/s/abrilfatface/v8/X1g_KwGeBV3ajZIXQ9VnDibsRidxnYrfzLNRqJkHfFo.ttf",
});

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
// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 500,
  },
  carousel: {
    width: 400,
    height: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    position: "absolute",
    top: 20,
    left: 20,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    objectFit: "cover",
  },
  profileName: {
    fontSize: 14,
    margin: 0,
  },
  content: {
    maxWidth: "80%",
    textAlign: "center",
    wordWrap: "break-word",
  },
});

// PDF Rendering
const MyDocument = ({ slides }: { slides: Slide[] }) => (
  <Document>
    {slides.map((slide, index) => (
      <Page
        key={index}
        size={{ width: 400, height: 500 }}
        style={{ ...styles.page, backgroundColor: slide.backgroundColor }}
      >
        <View style={styles.carousel}>
          <View style={styles.profile}>
            <Image
              src={slide.profileImage || "/src/assets/profile.png"}
              style={styles.profileIcon}
            />
            <Text
              style={{
                ...styles.profileName,
                color: slide.textColor,
                fontFamily: slide.fontFamily,
                fontSize: slide.fontSize,
              }}
            >
              {slide.name}
            </Text>
          </View>
          <Text
            style={{
              ...styles.content,
              color: slide.textColor,
              fontFamily: slide.fontFamily,
              fontSize: slide.fontSize,
            }}
          >
            {slide.content}
          </Text>
        </View>
      </Page>
    ))}
  </Document>
);

function SlidePreview() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([
    {
      content: "ADD CONTENT",
      name: "Your name",
      profileImage: null,
      backgroundColor: "#00a6a6",
      fontFamily: "Roboto",
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

  const addSlide = () => {
    if (slides.length >= 5) {
      alert("You can add only 5 slides");
      return;
    }

    setSlides((prev) => {
      const newSlides = [
        ...prev,
        {
          content: "ADD CONTENT",
          name: "Your name",
          profileImage: null,
          backgroundColor: "#00a6a6",
          fontFamily: "Roboto",
          fontSize: 18,
          textColor: "#000000",
          selectedFileName: "No file selected",
        },
      ];
      return newSlides;
    });
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

          <div
            className="carousel"
            style={{ backgroundColor: slides[currentSlide].backgroundColor }}
          >
            <div className="profile">
              <img
                className="profile-icon"
                src={
                  typeof slides[currentSlide].profileImage === "string"
                    ? slides[currentSlide].profileImage
                    : "/src/assets/profile.png"
                }
              />
              <p
                className="profile-name"
                style={{
                  fontSize: 14,
                  fontFamily: slides[currentSlide].fontFamily,
                  color: slides[currentSlide].textColor,
                }}
              >
                {slides[currentSlide].name}
              </p>
            </div>
            <div
              className="content"
              style={{
                fontFamily: slides[currentSlide].fontFamily,
                fontSize: `${slides[currentSlide].fontSize}px`,
                color: slides[currentSlide].textColor,
              }}
            >
              {slides[currentSlide].content}
            </div>
          </div>
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
                <option value="Abel">Abel</option>
                <option value="Abril Fatface">Abril Fatface</option>
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
      <PDFDownloadLink
        document={<MyDocument slides={slides} />}
        fileName="carousel.pdf"
      >
        <Fab
          color="primary"
          aria-label="Download"
          sx={{ position: "absolute", bottom: 35, right: 35 }}
        >
          <Download />
        </Fab>
      </PDFDownloadLink>
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
