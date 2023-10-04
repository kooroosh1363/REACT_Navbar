import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.scss"
import Careers from "./pages/careers/Careers";
import Home from "./pages/home/Home";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/CAREERS" element={<Careers/>}/> 
        <Route path="/ABOUT" element={<Careers/>}/> 
        <Route path="/PRODUCTS" element={<Careers/>}/> 
        <Route path="/CONTACT" element={<Careers/>}/> 
      </Routes>
    </div>
  );
}

export default App;
