import { React, Component } from 'react';
import ReactDOM from 'react-dom';
import { Navbar } from './components';
import { CraftingSim, CraftStats, Footer, Header } from './containers';
import './App.css'

class App extends Component {
  constructor(props) {
      super(props);
      
      this.state = { 
        recipe: ""
      }
  }
  setRecipe = (value) => {
    let tempVaue = value;
    this.setState( {recipe: tempVaue} )
    console.log("App.js: " + tempVaue);
  }

render() {
  return (
    <div className="App">
        <div className="gradient__bg">
          <Navbar />
          <Header setFunction={ this.setRecipe } />
          <CraftStats />
          <CraftingSim currRecipe={ this.state.recipe} key={ this.state.recipe } />
          <Footer />
        </div>
    </div>
    )
  }
}

export default App
