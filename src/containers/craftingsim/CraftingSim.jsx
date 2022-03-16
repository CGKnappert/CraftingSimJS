import { React, Component } from 'react';
import './craftingsim.css';
import CrafterSim from '../../code/craftingSim.js'


class CraftingSim extends Component {
  constructor(props) {
      super(props);
      let tempSim = new CrafterSim("", 0, 3320, 3373, 500, 90, 0);
      tempSim.loadActions();
      this.state = { 
        craftActions: [],
        currMacro: [],
        currBuffs: {},
        currDurability: 0,
        currProgress: 0,
        currQuality: 0,
        currCP: 0,
        craftSim: tempSim,
        recipe: props.currRecipe
        }; 
  }


  componentDidMount = () =>  {
    const actions = require('../../JSON/CraftAction.json');
    this.setState({ craftActions: actions  })
    this.state.craftSim.setRecipe(this.props.currRecipe);
    console.log("Crafitn Sim update");
    this.simulatorUpdate();
  }

  simulatorUpdate = () =>  {
    this.state.craftSim.executeMacro(this.state.currMacro, false, false);

    try {
      if (this.props.currRecipe !== "") {
        document.querySelector(".crafting-sim-recipe-icon").src = require(`../../assets/RecipeIcons/${ this.props.currRecipe }.png`);
      }

      const currProgress = document.querySelector('.crafting-sim-progress-bar-current');
      currProgress.style.width = Math.min(((this.state.craftSim.progress / this.state.craftSim.difficulty) * 100), 100)  + '%';
      currProgress.style.opacity = 1;

      const currQuality = document.querySelector('.crafting-sim-quality-bar-current');
      currQuality.style.width = Math.min(((this.state.craftSim.quality / this.state.craftSim.recipeQuality) * 100), 100) + '%';
      currQuality.style.opacity = 1;

      const currCP = document.querySelector('.crafting-sim-CP-bar-current');
      currCP.style.width = Math.min(((this.state.craftSim.CP / this.state.craftSim.maxCP) * 100), 100) + '%';
      currCP.style.opacity = 1;

      const progressHeader = document.querySelector('.crafting-sim-progress-header-right');
      progressHeader.innerHTML = ('<h3>' + (this.state.craftSim.progress) + ' / ' + (this.state.craftSim.difficulty) + '</h3>');

      const qualityHeader = document.querySelector('.crafting-sim-quality-header-right');
      qualityHeader.innerHTML = ('<h3>' + (this.state.craftSim.quality) + ' / ' + (this.state.craftSim.recipeQuality) + '</h3>');

      const CPHeader = document.querySelector('.crafting-sim-CP-header-right');
      CPHeader.innerHTML = ('<h3>' + (this.state.craftSim.CP) + ' / ' + (this.state.craftSim.maxCP) + '</h3>');


      const recipeHeader = document.querySelector('.crafting-sim-recipe-title');
      recipeHeader.innerHTML = ('<h3>' + 'Recipe: ' + this.props.currRecipe + '</h3>');
    } catch (error) {
      console.log("Not rendered yet: " + error)
    }
    
    
    this.setState({ currDurability: this.state.craftSim.durability,
      currProgress: this.state.craftSim.progress,
      currProgress: this.state.craftSim.progress,
      currQuality: this.state.craftSim.quality,
      currCP: this.state.craftSim.CP,
      currBuffs: this.state.craftSim.activeBuffs,
    })
  }
  

  addAction = (value) =>  {
    let tempMacro = this.state.currMacro;
    tempMacro.push(value);
    this.setState({ currMacro: tempMacro })
    this.simulatorUpdate();
  }


  removeAction = (value) =>  {
    let tempMacro = this.state.currMacro;
    tempMacro.splice(value, 1);
    this.setState({ currMacro: tempMacro })
    this.simulatorUpdate();
  }


  exportMacro = () =>  {
    this.simulatorUpdate();
  }


  importMacro = (value) =>  {
    this.state.craftSim.reformatMacro(value);
    this.simulatorUpdate();
  }


  render() {
    // TODO: Set states to const before refercning below
    return (
      <div className='crafting-sim-container'>
        <h1>CraftingSim</h1>
        <div className='crafting-sim-stats-and-recipe'>
          <div className='crafting-sim-recipe-title'/>
          <div className='crafting-sim-crafter-stats'><h3>Crafter Stats:</h3></div>
          <img className='crafting-sim-recipe-icon' />
        </div>
        <div className="crafting-sim-status-container">


        <div className="crafting-sim-progress-status">
            <div className="crafting-sim-progress-header">
              <div className="crafting-sim-progress-header-left">
                <h3>Craft Progress </h3>
              </div>
              <div className="crafting-sim-progress-header-right">
              </div>
            </div>
            <div className="crafting-sim-progress-bar-total">
              <div className="crafting-sim-progress-bar-current">
              </div>
            </div>
          </div>

          <div className="crafting-sim-quality-status">
            <div className="crafting-sim-quality-header">
              <div className="crafting-sim-quality-header-left">
                <h3>Craft Quality </h3>
              </div>
              <div className="crafting-sim-quality-header-right">
              </div>
              </div>
            <div className="crafting-sim-quality-bar-total">
              <div className="crafting-sim-quality-bar-current">
              </div>
            </div>
          </div>

          <div className="crafting-sim-CP-status">
            <div className="crafting-sim-CP-header">
              <div className="crafting-sim-progress-header-left">
                <h3>Craft CP </h3>
              </div>
              <div className="crafting-sim-CP-header-right">
              </div>
              </div>
            <div className="crafting-sim-CP-bar-total">
              <div className="crafting-sim-CP-bar-current">
              </div>
            </div>
          </div>

        </div>

        <div className="crafting-sim-buffs-active">
          <div className="crafting-sim-buffs-active-header">
                <h3>Current Buffs</h3>
          </div>
          {Object.keys(this.state.currBuffs).length > 0 && 
          <div className="crafting-sim-buffs-active-image">
            { Object.entries(this.state.currBuffs)
              .filter(([Name]) => (Name != 'Observe'))
              .map(([Name]) => <img key={Name} src={require(`../../assets/Buff Icons/${Name}${(Name === 'Inner Quiet') ? this.state.currBuffs['Inner Quiet'] : ''}.png`)} title={Name} alt={Name} /> )}
          </div>
          }
        </div>
            
        <div className="crafting-sim-macro">
          <div className="crafting-sim-macro-header">
              <div className="crafting-sim-progress-header-left">
                <h3>Macro in progress</h3>
              </div>
              <div className="crafting-sim-CP-header-right">
                <button className='exportMacro' onClick={this.exportMacro}>Export</button>
                <button className='importMacro'onClick={this.importMacro}>Import</button>
              </div>
          </div>
          <div className="crafting-sim-macro-actions">
            { this.state.currMacro
              .map((Name, index, arr) => <img key={index} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.removeAction(index)} /> )}
          </div>
        </div>

        <div className="crafting-sim-actions">

          <div className="crafting-sim-synthesis">
            <h3>Synthesis Actions</h3>
            <div className="crafting-sim-synthesis-actions">
              { this.state.craftActions
                .filter(({Description}) => Description.search('progress') !== -1)
                .map(({ Name }) => <img key={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.addAction(Name)} /> )}
            </div>
          </div>
              
          <div className="crafting-sim-quality">
            <h3>Quality Actions</h3>
            <div className="crafting-sim-quality-actions">
              { this.state.craftActions
                .filter(({Description}) => Description.search('quality') !== -1)
                .map(({ Name }) => <img key={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.addAction(Name)}  /> )}
            </div>
              
          </div>

          <div className="crafting-sim-buffs">
            <h3>Buff Actions</h3>
            <div className="crafting-sim-buffs-actions">
              { this.state.craftActions
                .filter(({Description}) => (Description.search('progress') === -1 && Description.search('quality') === -1))
                .map(({ Name }) => <img key={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.addAction(Name)}  /> )}
            </div>
              
          </div>
        </div>
      </div>
    )
  }
}

export default CraftingSim
