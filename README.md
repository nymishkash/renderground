# Renderground

[Live Link](https://renderground.netlify.app)

Renderground is a powerful and user-friendly canvas drawing application built with React. This application allows users to create various shapes, add text, and customize their drawings with different tools and styles.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Shape Creation**: Draw circles, rectangles, and add text to the canvas.
- **Customizable Tools**: Select different drawing tools and customize their properties.
- **Grid Support**: Toggle grid visibility and snap shapes to the grid for precise placement.
- **Loading State**: Displays a loading animation while the canvas is being initialized.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Lucide Icons**: A set of open-source icons for React.
- **Custom Hooks**: For managing canvas state and shape properties.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/nymishkash/renderground-frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd renderground-frontend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000`.

## Usage

Once the application is running, you can:

- Select a drawing tool from the left panel.
- Click and drag on the canvas to create shapes.
- Use the shape customizer to adjust properties like size, color, and stroke.
- Toggle the grid to help align your shapes.

## Components

### CanvasArea

The main component where users interact with the canvas. It handles mouse events for drawing shapes and displays the current image.

### ShapeCustomizer

A component that allows users to customize the properties of the selected shape, including width, height, and color.

### DrawingTools

A component for selecting different drawing tools (circle, rectangle, text).

### ColorPicker

A component for selecting colors for the shapes.

### StrokeControls

A component for adjusting stroke properties like width and outline.

### ExportTools

A component for exporting the canvas as an image.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.


---
