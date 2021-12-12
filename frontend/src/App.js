import './App.css';
import React from 'react';
import UploadForm from './FileUpload';
import Home from "./Home";
import Navigator from './NavigationBar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
        <Navigator />
          <Routes>
            <Route path="/batchProcessing" element={<UploadForm />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
