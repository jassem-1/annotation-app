import { useEffect, useState } from 'react';

function ResultPage() {
  const [modifiedImage, setModifiedImage] = useState(null);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const savedImage = sessionStorage.getItem('modifiedImage');
    const savedShapes = sessionStorage.getItem('shapes');
    
    if (savedImage) setModifiedImage(savedImage);
    if (savedShapes) setShapes(JSON.parse(savedShapes));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Final Result</h1>

      {/* Display the modified image */}
      {modifiedImage && (
        <div className="relative mb-6 w-full">
          <img
            src={modifiedImage}
            alt="Modified"
            style={{
              width: '80%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      {/* Display the saved notes */}
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
  );
}

export default ResultPage;
