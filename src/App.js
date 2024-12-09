import React, { useState, useRef, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';

function App() {
  const [image, setImage] = useState(null);
  const [modifiedImage, setModifiedImage] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("black"); // Default drawing color
  const [noteColor, setNoteColor] = useState("black"); // Default note color
  const [currentNote, setCurrentNote] = useState(""); // Store the current note input
  const [shapes, setShapes] = useState([]); // Store the saved notes and their colors
  const canvasRef = useRef(null);

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: window.innerWidth * 0.45, // 80% of window width
    height: window.innerHeight * 0.55 // 60% of window height
  });

  useEffect(() => {
    const img = new Image();
    img.src = '/portfolio.png'; // Replace with the actual image path
    img.onload = () => {
      setImage(img.src);
    };
    // Adjust canvas size when window is resized
    window.addEventListener('resize', () => {
      setCanvasDimensions({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.5
      });
    });

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  // Handle drawing state toggle (Start/Stop Drawing)
  const handleToggleDrawing = () => {
    setIsDrawing(!isDrawing); // Toggle drawing state
  };

  // Handle color change for drawing
  const handleDrawingColorChange = (color) => {
    setDrawingColor(color);
  };

  // Handle color change for notes
  const handleNoteColorChange = (color) => {
    setNoteColor(color);
  };

  // Handle saving the note
  const handleSaveNote = () => {
    if (currentNote.trim()) {
      setShapes([...shapes, { note: currentNote, color: noteColor }]);
      setCurrentNote(""); // Clear the note input field after saving
    }
  };

  // Handle saving the image (canvas with drawing)
  const handleSaveImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.canvasContainer.children[1]; // Access the canvas element
      const dataUrl = canvas.toDataURL();
      setModifiedImage(dataUrl); // Set the modified image to be displayed below
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Image Drawing App</h1>

      <div className="w-full flex items-start gap-x-6 justify-center bg-white shadow-lg rounded-lg p-20">
        <div className="mb-4 ">
          <div className="flex items-center mb-4">
            {/* Start/Stop Drawing Button */}
            <button
              onClick={handleToggleDrawing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-4"
            >
              {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
            </button>

            {/* Drawing Color Palette */}
            <div className="flex gap-x-2">
              <div
                onClick={() => handleDrawingColorChange("black")}
                className="w-6 h-6 bg-black rounded-full cursor-pointer border-2 border-gray-300 "
              />
              <div
                onClick={() => handleDrawingColorChange("red")}
                className="w-6 h-6 bg-red-500 rounded-full cursor-pointer border-2 border-gray-300 "
              />
              <div
                onClick={() => handleDrawingColorChange("blue")}
                className="w-6 h-6 bg-blue-500 rounded-full cursor-pointer border-2 border-gray-300 "
              />
              <div
                onClick={() => handleDrawingColorChange("green")}
                className="w-6 h-6 bg-green-500 rounded-full cursor-pointer border-2 border-gray-300"
              />
              <div
                onClick={() => handleDrawingColorChange("yellow")}
                className="w-6 h-6 bg-yellow-500 rounded-full cursor-pointer border-2 border-gray-300"
              />
            </div>
          </div>

          <div className="relative mb-6 w-full">
            {image && (
              <CanvasDraw
                ref={canvasRef}
                imgSrc={image}
                brushColor={drawingColor} // Set the brush color to the selected one
                brushRadius={2}
                lazyRadius={0}
                hideGrid={true}
                disabled={!isDrawing}
                className="border-2 border-gray-300 rounded-lg w-full"
                canvasWidth={canvasDimensions.width} // Dynamic width
                canvasHeight={canvasDimensions.height} // Dynamic height
              />
            )}
          </div>

          {/* Save Image Button */}
          <button
            onClick={handleSaveImage}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Save Image
          </button>
        </div>

        {/* Notes Section */}
        <div className="flex flex-col w-1/3 justify-center items-start p-4">
          <h2 className="text-2xl font-semibold mb-4">Notes</h2>

          {/* Note Color Palette */}
          <div className="flex gap-x-2 mb-4">
            <div
              onClick={() => handleNoteColorChange("black")}
              className="w-6 h-6 bg-black rounded-full cursor-pointer border-2 border-gray-300"
            />
            <div
              onClick={() => handleNoteColorChange("red")}
              className="w-6 h-6 bg-red-500 rounded-full cursor-pointer border-2 border-gray-300"
            />
            <div
              onClick={() => handleNoteColorChange("blue")}
              className="w-6 h-6 bg-blue-500 rounded-full cursor-pointer border-2 border-gray-300"
            />
            <div
              onClick={() => handleNoteColorChange("green")}
              className="w-6 h-6 bg-green-500 rounded-full cursor-pointer border-2 border-gray-300"
            />
            <div
              onClick={() => handleNoteColorChange("yellow")}
              className="w-6 h-6 bg-yellow-500 rounded-full cursor-pointer border-2 border-gray-300"
            />
          </div>

          {/* Note Textarea */}
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Add a note"
            className="w-full p-2 border-2 border-gray-300 rounded-md mb-4"
          />

          {/* Save Note Button */}
          <button
            onClick={handleSaveNote}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
          >
            Save Note
          </button>

          {/* Notes List */}
          <div className="mt-6 w-full bg-gray-400 p-2 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 ">Saved Notes:</h3>
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
      </div>

      {/* Modified Image Section */}
      {modifiedImage && (
        <div className="mt-6 flex">
          <div
            className="relative"
            style={{
              width: '80%',
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
        </div>
      )}
    </div>
  );
}

export default App;
