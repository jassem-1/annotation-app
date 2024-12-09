import React, { useState, useRef, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';

function App() {
  const [image, setImage] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [modifiedImage, setModifiedImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [shapes, setShapes] = useState([]); // To store the drawn shapes, their colors, and notes
  const [currentNote, setCurrentNote] = useState(""); // To store the current note input
  const [currentColor, setCurrentColor] = useState("black"); // Default drawing color
  const canvasRef = useRef(null);

  // Use useEffect to load the image from the public folder on component mount
  useEffect(() => {
    const img = new Image();
    img.src = '/portfolio.png'; // Replace with the actual image path in the public folder
    img.onload = () => {
      setImage(img.src);
      setImageDimensions({ width: img.width, height: img.height });
      setModifiedImage(null);  // Reset the modified image when a new image is loaded
    };
  }, []);

  // Handle drawing state toggle
  const handleToggleDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  // Handle saving the drawn shape and displaying the modified image
  const handleSaveImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.canvasContainer.children[1]; // Access the canvas element
      const dataUrl = canvas.toDataURL();
      setModifiedImage(dataUrl); // Set the modified image to be displayed below
    }
  };

  // Handle adding a note after drawing
  const handleAddNote = () => {
    if (currentNote.trim()) {
      // Add the current note to the shapes state with the selected color
      const newPosition = {
        x: 100 + shapes.length * 150,  // Increment position for each new note to avoid overlap
        y: 100 + shapes.length * 30,   // Increment y position as well
      };
      setShapes([...shapes, { note: currentNote, position: newPosition, color: currentColor }]);
      setCurrentNote(""); // Clear the note input field
    }
  };

  // Handle color change
  const handleColorChange = (event) => {
    setCurrentColor(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Image Drawing App</h1>

      <div className="w-full flex bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <div className="mb-4">
            <input
              type="color"
              value={currentColor}
              onChange={handleColorChange}
              className="w-full"
            />
          </div>

          <div className="relative mb-6">
            {image && (
              <CanvasDraw
                ref={canvasRef}
                imgSrc={image}
                brushColor={currentColor} // Set the brush color to the selected one
                brushRadius={2}
                lazyRadius={0}
                hideGrid={true}
                disabled={!isDrawing}
                className="border-2 border-gray-300 rounded-lg"
                canvasWidth={imageDimensions.width}
                canvasHeight={imageDimensions.height}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-between mb-4">
            <button
              onClick={handleToggleDrawing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
            </button>
            <button
              onClick={handleSaveImage}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Save Image
            </button>
          </div>

          <div className="mb-4">
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Add a note"
              className="w-full p-2 border-2 border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={handleAddNote}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
          >
            Add Note
          </button>
        </div>
      </div>

      {modifiedImage && (
        <div className="mt-6 flex">
          {/* Modified Image Section */}
          <div
            className="relative"
            style={{
              width: '80%', // Adjust width as needed
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <img
              src={modifiedImage}
              alt="Modified"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Notes List Section */}
          <div className="ml-6 w-1/3">
            <h2 className="text-xl font-semibold mb-4">Notes:</h2>
            <ul className="space-y-4">
              {shapes.map((shape, index) => (
                <li key={index} className="p-4 border-2 rounded-lg" style={{ borderColor: shape.color }}>
                  <div style={{ color: shape.color }}>
                    <strong>Note {index + 1}: </strong>{shape.note}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
