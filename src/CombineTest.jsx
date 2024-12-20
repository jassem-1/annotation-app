import React, { useState, useRef, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';

function Annotation() {
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
    height: window.innerHeight * 0.55, // 60% of window height
  });

  useEffect(() => {
    const img = new Image();
    img.src = '/portfolio.png'; // Replace with the actual image path
    img.onload = () => {
      setImage(img.src);
    };

    // Adjust canvas size when window is resized
    const handleResize = () => {
      setCanvasDimensions({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.5,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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

  // Handle saving the image (canvas with drawing + original image combined)
  const handleSaveImage = () => {
    if (canvasRef.current) {
      // Create a new canvas element
      const combinedCanvas = document.createElement('canvas');
      combinedCanvas.width = canvasDimensions.width;
      combinedCanvas.height = canvasDimensions.height;
      const ctx = combinedCanvas.getContext('2d');

      // Draw the original image onto the combined canvas
      const img = new Image();
      img.src = image; // Use the original image source
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvasDimensions.width, canvasDimensions.height);

        // Draw the drawing from the react-canvas-draw canvas onto the combined canvas
        const drawingCanvas = canvasRef.current.canvasContainer.children[1]; // Access the drawing canvas
        ctx.drawImage(drawingCanvas, 0, 0, canvasDimensions.width, canvasDimensions.height);

        // Export the combined canvas as a data URL
        const dataUrl = combinedCanvas.toDataURL();
        setModifiedImage(dataUrl); // Save the combined image
        sessionStorage.setItem('combinedImage', dataUrl);
      };
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
              {['black', 'red', 'blue', 'green', 'yellow'].map((color) => (
                <div
                  key={color}
                  onClick={() => handleDrawingColorChange(color)}
                  className={`w-6 h-6 bg-${color}-500 rounded-full cursor-pointer border-2 border-gray-300`}
                  style={{ backgroundColor: color }}
                />
              ))}
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
            Save Combined Image
          </button>
        </div>

        {/* Notes Section */}
        <div className="flex flex-col w-1/3 justify-center items-start p-4">
          <h2 className="text-2xl font-semibold mb-4">Notes</h2>

          {/* Note Color Palette */}
          <div className="flex gap-x-2 mb-4">
            {['black', 'red', 'blue', 'green', 'yellow'].map((color) => (
              <div
                key={color}
                onClick={() => handleNoteColorChange(color)}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 border-gray-300`}
                style={{ backgroundColor: color }}
              />
            ))}
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
            <h3 className="text-xl font-semibold mb-4">Saved Notes:</h3>
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
          <img
            src={modifiedImage}
            alt="Combined Image"
            className="border-2 border-gray-300 rounded-lg"
            style={{ maxWidth: '100%' }}
          />
        </div>
      )}
    </div>
  );
}

export default Annotation;
