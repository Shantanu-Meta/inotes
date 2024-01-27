import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Modal from './components/Modal';
import Alert from './components/Alert';
import Signup from './components/Signup';


function App() {
  return (
      <>
      <NoteState>
        <Alert/>
        <Modal/>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
      </NoteState>
      </>
  );
}

export default App;
