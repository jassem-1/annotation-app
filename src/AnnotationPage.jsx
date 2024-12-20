import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Annotation from "./Annotation";

const AnnotationPage = () => {
  const { projectID } = useParams();
  const { state } = useLocation(); // Access the passed screenshot
  const screenshot = state?.screenshot;

  if (!screenshot) return <p>No screenshot selected for annotation.</p>;

  // Save the annotated image (you can reuse your Cloudinary and Firestore logic here)
  const saveAnnotatedImage = async (annotatedImageData) => {
    // Logic to upload to Cloudinary and save metadata in Firestore
    console.log("Annotated image saved:", annotatedImageData);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6">Annotate Screenshot</h1>
      <Annotation initialImage={screenshot} onSave={saveAnnotatedImage} />
    </div>
  );
};

export default AnnotationPage;
