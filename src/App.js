import React, { Component, useState, useReducer } from 'react';
import { Navbar } from './components';
import './App.css';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux'

// import SimState from './context/SimState'


function App() {

  // constructor(props) {
  //     super(props);
      
  //     this.state = { 
  //       recipe: ""
  //     }
  // }

  // setRecipe = (value) => {
  //   let tempVaue = value;
  //   this.setState( {recipe: tempVaue} )
  //   console.log("App.js: " + tempVaue);
  // }

  return (
    <div className="App">
      <div className="gradient__bg">
          <Navbar />
      </div>
    </div>
    )
}

export default App