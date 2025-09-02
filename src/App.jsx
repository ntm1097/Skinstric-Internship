import "./App.css";
import Main from "./Pages/Main";
import IntroName from "./Pages/IntroName";
import IntroLocation from "./Pages/IntroLocation";
import PhotoUpload from "./Pages/PhotoUpload";
import FullCamera from "./Pages/FullCamera";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoAnalizing from "./Pages/PhotoAnalizing";
import CameraSetup from "./Pages/CameraSetup";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/intro" element={<IntroName />} />
          <Route path="/intro-location" element={<IntroLocation />} />
          <Route path="/photo-upload" element={<PhotoUpload />} />
          <Route path="/photo-analizing" element={<PhotoAnalizing />} />
          <Route path="/camera-setup" element={<CameraSetup />} />
          <Route path="/full-camera" element={<FullCamera />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
