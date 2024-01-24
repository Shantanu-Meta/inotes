import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';


function App() {
  return (
      <>
      <NoteState>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/about' element={<About/>}/>
        </Routes>
      </NoteState>
      </>
  );
}

export default App;
