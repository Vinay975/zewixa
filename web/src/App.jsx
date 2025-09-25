import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./header/header";

import Home from "./screen/home";
import About from "./screen/about";
import ForLogin from "./screen/forlogin";
import Profile from "./screen/profile";

import Footer from "./footer/footer";

//css
import "./styles/App.css"
function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/forlogin" element={<ForLogin/>}/>
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
