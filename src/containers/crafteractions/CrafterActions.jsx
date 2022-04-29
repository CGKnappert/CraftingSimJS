import React, { Component, useState, useContext } from 'react';
import './crafteractions.css';
import Asyncstorage from '@react-native-async-storage/async-storage';
import { setMeal, setTincture } from '../../context/index'
import { connect } from 'react-redux';


class CrafterActions extends Component {
  constructor(props) {
    super(props);
    let macroString = "";
    this.state = {
      craftActions: [],
      currBuffs: {},
      currDurability: 0,
      currProgress: 0,
      currQuality: 0,
      currCP: 0,
      craftsmanshipStat: 2000,
      controlStat: 2000,
      cpStat: 500,
      showExport: false,
      showImport: false
    };
  }

  componentDidMount = () => {
    this._isMounted = true;

    const actions = require('../../JSON/CraftAction.json');
    this.setState({ craftActions: actions })

    // this.simulatorUpdate();
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  loadData = async () => {
    try {
      if (this._isMounted) {
        const craftsmanshipStat = await Asyncstorage.getItem('craftsmanshipStat')
        const controlStat = await Asyncstorage.getItem('controlStat')
        const cpStat = await Asyncstorage.getItem('cpStat')
        const currRecipe = await Asyncstorage.getItem('currRecipe')
        const currMeal = await Asyncstorage.getItem('currMeal')
        const currMacro = await Asyncstorage.getItem('currMacro')

        if (craftsmanshipStat !== null) {
          this.setState({ craftsmanshipStat: craftsmanshipStat })
        }
        if (controlStat !== null) {
          this.setState({ controlStat: controlStat })
        }
        if (cpStat !== null) {
          this.setState({ cpStat: cpStat })
        }
        if (currRecipe !== null) {
          // this.setState({ cpStat: cpStat })
        }
        if (currMacro !== null) {
          // this.setState({ currMacro: JSON.parse(currMacro) })
        }
        if (currMeal !== null) {
          this.setState({ currMeal: JSON.parse(currMeal) })
          let mealInput = document.getElementById("mealInput");

          this.setState({
            isMealHQ: !this.state.isMealHQ,
            mealBonusCraftsmanship: (this.state.currMeal.Bonuses.Craftsmanship !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.Craftsmanship.MaxHQ : this.state.currMeal.Bonuses.Craftsmanship.Max) : 0,
            mealBonusControl: (this.state.currMeal.Bonuses.Control !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.Control.MaxHQ : this.state.currMeal.Bonuses.Control.Max) : 0,
            mealBonusCP: (this.state.currMeal.Bonuses.CP !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.CP.MaxHQ : this.state.currMeal.Bonuses.CP.Max) : 0
          });

          this.updateMeal(JSON.parse(currMeal).Name);
        }
      }
    }
    catch (err) {
      console.log("loadData: " + err)
    }
    // this.props.craftSim.updateCrafterStats(parseInt(this.state.craftsmanshipStat) + parseInt(this.state.mealBonusCraftsmanship), parseInt(this.state.controlStat) + parseInt(this.state.mealBonusControl), parseInt(this.state.cpStat) + parseInt(this.state.mealBonusCP), 90, 0);
    // this.simulatorUpdate();
  }

  // updateCrafterCraftsmanshipStat = async (event) =>  {
  //   this.setState({ craftsmanshipStat: event.target.value })
  //   this.props.craftSim.updateCrafterCraftsmanshipStat(event.target.value);
  //   this.simulatorUpdate();
  //   try {
  //     await Asyncstorage.setItem('craftsmanshipStat', event.target.value)
  //   }
  //   catch (err) {
  //     console.log("updateCrafterCraftsmanshipStat: " + err)
  //   }
  // }

  // updateCrafterControlStat = async (event) =>  {
  //   this.setState({ controlStat: event.target.value })
  //   this.props.craftSim.updateCrafterControlStat(event.target.value);
  //   this.simulatorUpdate();
  //   try {
  //     await Asyncstorage.setItem('controlStat', event.target.value)
  //   }
  //   catch (err) {
  //     console.log("updateCrafterControlStat: " + err)
  //   }
  // }

  // updateCrafterCPStat = async (event) =>  {
  //   this.setState({ cpStat: event.target.value })
  //   this.props.craftSim.updateCrafterCPStat(event.target.value);
  //   this.simulatorUpdate();
  //   try {
  //     await Asyncstorage.setItem('cpStat', event.target.value)
  //   }
  //   catch (err) {
  //     console.log("updateCrafterCPStat: " + err)
  //   }
  // }




  addAction = async (value) => {
    let tempMacro = this.props.currMacro;
    tempMacro.push(value);
    this.props.setMacroFunction(tempMacro);
    // this.setState({ currMacro: tempMacro })
    // this.simulatorUpdate();
    // try {
    //   await Asyncstorage.setItem('currMacro', JSON.stringify(this.state.currMacro))
    //   console.log("try" + JSON.stringify(this.state.currMacro))
    // }
    // catch (err) {
    //   console.log("currMacro: " + err)
    // }
  }


  removeAction = async (value) => {
    let tempMacro = this.props.currMacro;
    tempMacro.splice(value, 1);
    this.props.setMacroFunction(tempMacro);
    // this.setState({ currMacro: tempMacro })
    // this.simulatorUpdate();
    // try {
    //   await Asyncstorage.setItem('currMacro', JSON.stringify(this.state.currMacro))
    //   console.log("try" + JSON.stringify(this.state.currMacro))
    // }
    // catch (err) {
    //   console.log("currMacro: " + err)
    // }
  }

  closeOverlay = () => {
    this.state.showImport = false;
    this.state.showExport = false;
    console.log("close");
    this.forceUpdate();
  }


  openExportOverlay = () => {
    // let overlay = document.getElementById("exportedMacro");
    // overlay.value = this.getFFMacro();

    let macroString = "";
    for (let step of this.props.currMacro) {
      macroString += ("/ac " + step + " <wait.3>" + "\n")
    }
    console.log(macroString)
    this.macroString = macroString;

    this.setState({ showExport: true })
  }


  importMacro = () => {
    let importMacro = document.getElementById("importedMacro");
    // this.state.craftSim.ImportMacro(importMacro.value);
    this.setState({ showImport: false });
    console.log(importMacro.value);

  }

  openImportOverlay = (value) => {
    this.setState({ showImport: true });
    // this.forceUpdate();
  }

  updateImportMacro = (event) => {
     let importInput = document.getElementById("importedMacro");
     importInput.value = event.target.value;
     console.log(event.target.value);
  }


  render() {
    console.log("Render CSim: " + this.props.recipe)
    // TODO: Set states to const before refercning below
    return (
      <div className='crafting-sim-container'>
        {this.state.showImport &&
          <div className="import-overlay-container">
            <div className="import-overlay" onClick={this.closeOverlay} >
            </div>
            <div className='import-overlay-window'>
              <textarea className='import-overlay-macro' id="importedMacro" cols="15" type="string" />
              <button className='importMacro' onClick={this.importMacro}>Import Macro</button>
            </div>
          </div>
        }

        {this.state.showExport &&
          <div className="export-overlay-container">
            <div className="export-overlay" onClick={this.closeOverlay}  >
            </div>
            <div className='export-overlay-window'>
              <textarea className='export-overlay-macro' id="exportedMacro"  cols="15" type="string" value={this.macroString} readOnly={true} />
            </div>
          </div>
        }
        <h1>CraftingSim</h1>
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
              {Object.entries(this.state.currBuffs)
                .filter(([Name]) => (Name !== 'Observe' || Name !== 'Trained Eye'))
                .map(([Name]) => <img key={Name} src={require(`../../assets/Buff Icons/${Name}${(Name === 'Inner Quiet') ? this.state.currBuffs['Inner Quiet'] : ''}.png`)} title={Name} alt={Name} />)}
            </div>
          }
        </div>

        <div className="crafting-sim-macro">
          <div className="crafting-sim-macro-header">
            <div className="crafting-sim-progress-header-left">
              <h3>Macro in progress</h3>
            </div>
            <div className="crafting-sim-CP-header-right">
              <button className='openExportMacro' onClick={this.openExportOverlay}>Export</button>
              <button className='openImportMacro' onClick={this.openImportOverlay}>Import</button>
            </div>
          </div>
          <div className="crafting-sim-macro-actions">
            {this.props.currMacro
              .map((Name, index, arr) => <img key={index} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.removeAction(index)} />)}
          </div>
        </div>

        <div className="crafting-sim-actions">

          <div className="crafting-sim-synthesis">
            <h3>Synthesis Actions</h3>
            <div className="crafting-sim-synthesis-actions">
              {this.state.craftActions
                .filter(({ Description }) => Description.search('progress') !== -1)
                .map(({ Name }) => <img key={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.addAction(Name)} />)}
            </div>
          </div>

          <div className="crafting-sim-quality">
            <h3>Quality Actions</h3>
            <div className="crafting-sim-quality-actions">
              {this.state.craftActions
                .filter(({ Description }) => Description.search('quality') !== -1)
                .map(({ Name }) => <img key={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.addAction(Name)} />)}
            </div>

          </div>

          <div className="crafting-sim-buffs">
            <h3>Buff Actions</h3>
            <div className="crafting-sim-buffs-actions">
              {this.state.craftActions
                .filter(({ Description }) => (Description.search('progress') === -1 && Description.search('quality') === -1))
                .map(({ Name }) => <img key={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.addAction(Name)} />)}
            </div>

          </div>
        </div>
      </div>
    )
  }
}


const mapStateToFunction = state => {
  return {
    recipe: state.recipe,
    meal: state.meal,
    macro: state.macro
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMeal: (meal) => dispatch(setMeal(meal)),
    setTincture: (tincture) => dispatch(setTincture(tincture))
  }
}

export default connect(mapStateToFunction, mapDispatchToProps)(CrafterActions);