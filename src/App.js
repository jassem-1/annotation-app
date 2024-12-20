import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResultPage from './ResultPage';
import Annotation from './CombineTest';
import AnnotationPage from './AnnotationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Annotation />} />
        <Route path="/result" element={<ResultPage />} />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
