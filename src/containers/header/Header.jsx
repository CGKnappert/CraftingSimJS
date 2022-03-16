import React, { useState } from 'react';
import './header.css';
import bun from '../../assets/Just Bun.png'
import images from './crafters.js';
import RecipeDropDownList from '../recipedropdown/RecipeDropdown'
import $ from 'jquery';

//TODO: Shoud, componentUpdate function to reduce stress

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.classImages = images;
    this.setSimRecipe = this.setSimRecipe.bind(this);
    this.state = { 
      recipe: '',
      selected: []
    }; 
  }

  setToggleClass = (id) => {
    this.classImages[id]["state"] = !this.classImages[id]["state"];
    let newSelected = [];
    this.classImages.forEach(element => {
      if (element["state"]) {
        newSelected.push(element["shortClass"]);
      }
    });
    this.setState({selected: newSelected});
    console.log(newSelected);
  }

  setSimRecipe = (newRecipe) => {
    let tempRecipe = newRecipe;
    this.setState({recipe: tempRecipe});
    this.props.setFunction(tempRecipe);
    console.log("header: " + tempRecipe);
  }

  render() {
    console.log(this.state.recipe);
    return(
      <div className='gpt__header section__padding' id='home'>
        <div className='gpt__header-content'>
          <h1 className='gradient__text'>FFXIV Crafting Simulator</h1>
          <div className='gpt3__header-content__searches'>
          </div>

          <div className='gpt3__header-image'>
              {/* <img src={bun} alt="bun"/>  */}
          </div>
          <div className='craft-classes'>
              { this.classImages.map(({id, title, description, state}) => <img key={id} src={require(`../../assets/Classes/${title}.png`)} title={title} alt={state} className={state==true ? 'craft-classes-selected' : 'craft-classes-unselected'} onClick={() => this.setToggleClass(id) } /> )}
          </div>

          <div className='gpts__header-content__input'>
            <RecipeDropDownList classFilter={this.state.selected} setRecipe={this.setSimRecipe} />
          </div>

        </div>
      </div>
    )
  }
};



export default Header;
