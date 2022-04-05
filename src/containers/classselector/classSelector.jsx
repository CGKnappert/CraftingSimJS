import React from 'react';
import './classselector.css';
import images from '../../pages/craftingsimulatorpage/crafters.js';

//TODO: Shoud, componentUpdate function to reduce stress

class ClassSelector extends React.Component {
  constructor(props) {
    super(props)
  }

  // setSimRecipe = (newRecipe) => {
  //   let tempRecipe = newRecipe;
  //   // this.setState({ recipe: tempRecipe });
  //   // this.props.setRecipeFunction(tempRecipe);
  // }

  render() {
    return (
      <div className='stickysim__header_container'>
        <div className='stickysim__header-content__searches'>
          <div className='stickysim__craft-classes'>
              { this.props.classImages.map(({id, title, state}) => <img key={id} src={require(`../../assets/Classes/${title}.png`)} title={title} alt={title} className={state===true ? 'craft-classes-selected' : 'craft-classes-unselected'} onClick={() => this.props.setToggleClass(id) } /> )}
          </div>
        </div>
      </div>
    )
  }
};

export default ClassSelector;