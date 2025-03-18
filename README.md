# LinkedIn Carousel Generator

Create and export LinkedIn carousels as PDFs. This application allows users to design slides with customizable text, profile images, fonts, background colors, and export them as a multi-page PDF document.

![Demo1](./src/assets/Screenshot%20from%202025-03-18%2021-07-21.png) 
![Demo2](./src/assets/Screenshot%20from%202025-03-18%2021-07-26.png)

## Features

- **Slide Preview**: Real-time preview of the slide being edited.
- **Text Customization**: Add and edit text content for each slide.
- **Profile Image and Name**: Upload a profile image and display a name/handle on the slide.
- **Styling Options**: Customize background color, text color, font family, and font size.
- **Multiple Slides**: Add, and navigate through multiple slides. (TODO: Implement remove slides)
- **PDF Export**: Export the entire carousel as a multi-page PDF.

## Technologies Used

- **Frontend**: React, TypeScript
- **Styling**: CSS, Material-UI (MUI)
- **PDF Generation**: `@react-pdf/renderer`
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dtmw8z/carousel-generator

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
2. Open the application in your browser:
   ```
   http://localhost:3000
   ```
3. Design your carousel slides and export as a PDF. 

### Information

This project is done to understand the concepts of React and TypeScript. So the UI is minimal and the functionalities are limited. However the functionalities of the coding challnege are implemented. UI might be improved in the future.

This is a part of coding challenge from John Cricket. The link : [https://codingchallenges.fyi/challenges/challenge-licq](https://codingchallenges.fyi/challenges/challenge-licq)