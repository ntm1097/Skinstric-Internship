import "./App.css";
import Nav from "./Components/Nav";
import Main from "./Pages/Main";
import IntroName from "./Pages/IntroName";
import IntroLocation from "./Pages/IntroLocation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/intro" element={<IntroName />} />
          <Route path="/intro-location" element={<IntroLocation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
