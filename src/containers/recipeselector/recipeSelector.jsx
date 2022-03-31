import React from 'react';
import './recipeselector.css';
import images from './crafters.js';
import RecipeDropDownList from '../recipedropdown/RecipeDropdown'

//TODO: Shoud, componentUpdate function to reduce stress

class RecipeSelector extends React.Component {
  constructor(props) {
    super(props)
    this.classImages = images;
    this.setSimRecipe = this.setSimRecipe.bind(this);
    this.state = { 
      recipe: props.currRecipe,
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
  }

  setSimRecipe = (newRecipe) => {
    let tempRecipe = newRecipe;
    // this.setState({ recipe: tempRecipe });
    this.props.setRecipeFunction(tempRecipe);
  }

  render() {
    return (
      <div className='stickysim__header_container'>
        <div className='stickysim__header-content'>
          <h1 className='gradient__text'>FFXIV Crafting Simulator</h1>
        </div>
        <div className='stickysim__header-content__searches'>

          <div className='stickysim__header-image'>
              {/* <img src={bun} alt="bun"/>  */}
          </div>
          <div className='stickysim__craft-classes'>
              { this.classImages.map(({id, title, state}) => <img key={id} src={require(`../../assets/Classes/${title}.png`)} title={title} alt={title} className={state===true ? 'craft-classes-selected' : 'craft-classes-unselected'} onClick={() => this.setToggleClass(id) } /> )}
          </div>

          <div className='stickysim__header-content__input'>
            <RecipeDropDownList classFilter={ this.state.selected } setRecipe={ this.props.setRecipeFunction } currRecipe={ this.props.currRecipe } />
          </div>

        </div>
      </div>
    )
  }
};



export default RecipeSelector;
