import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/HomePage/LoginPage";
import SignUpPage from "./components/HomePage/SignUpPage";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
