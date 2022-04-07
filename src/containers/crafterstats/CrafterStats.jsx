import React, { Component, useState, useContext } from 'react';
import './crafterstats.css';
import { setMeal, setTincture } from '../../context/index'
import { connect } from 'react-redux';


class CrafterStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            craftsmanshipStat: 2000,
            controlStat: 2000,
            cpStat: 500
        };
    }

    updateCrafterCraftsmanshipStat = (event) => {
        this.setState({ craftsmanshipStat: event.target.value })
        // this.props.craftSim.updateCrafterCraftsmanshipStat(event.target.value);
        // this.simulatorUpdate();
        // try {
        //     await Asyncstorage.setItem('craftsmanshipStat', event.target.value)
        // }
        // catch (err) {
        //     console.log("updateCrafterCraftsmanshipStat: " + err)
        // }
    }

    updateCrafterControlStat = (event) => {
        this.setState({ controlStat: event.target.value })
        // this.props.craftSim.updateCrafterControlStat(event.target.value);
        // this.simulatorUpdate();
        // try {
        //     await Asyncstorage.setItem('controlStat', event.target.value)
        // }
        // catch (err) {
        //     console.log("updateCrafterControlStat: " + err)
        // }
    }

    updateCrafterCPStat = (event) => {
        this.setState({ cpStat: event.target.value })
        // this.props.craftSim.updateCrafterCPStat(event.target.value);
        // this.simulatorUpdate();
        // try {
        //     await Asyncstorage.setItem('cpStat', event.target.value)
        // }
        // catch (err) {
        //     console.log("updateCrafterCPStat: " + err)
        // }
    }

    render() {
        console.log(this.state.recipe)
        return (
            <div className='crafting-sim-stats-and-recipe'>
                <div className='crafting-sim-stats-container'>
                    <div className='crafting-sim-crafter-stats-title'><h3>Crafter Stats:</h3></div>
                    <div className='crafting-sim-crafter-stats'>
                        <label htmlFor="craftsmanship">Craftsmanship: </label>
                        <input type="number" className='crafting-sim-crafter-craftsmanship' id="craftsmanship" placeholder="2000" min="1" max="5000" onChange={this.updateCrafterCraftsmanshipStat} value={this.state.craftsmanshipStat} />
                        <label htmlFor="control">Control: </label>
                        <input type="number" className='crafting-sim-crafter-control' id="control" placeholder="2000" min="1" max="5000" onChange={this.updateCrafterControlStat} value={this.state.controlStat} />
                        <label htmlFor="CP">CP: </label>
                        <input type="number" className='crafting-sim-crafter-CP' id="CP" placeholder="500" min="1" max="2000" onChange={this.updateCrafterCPStat} value={this.state.cpStat} />
                    </div>
                </div>
                <div className='crafting-sim-recipe-container'>
                    <div className='crafting-sim-recipe-title'> <h3> {'Recipe: ' + (this.state.recipe)} </h3> </div>
                    {/* <div className='crafting-sim-recipe-icon'><img className='crafting-sim-recipe-icon-img' alt='' src={ (this.state.recipe !== "" && this.state.recipe !== "undefined") ? require(`../../assets/RecipeIcons/${this.state.recipe}.png`) : ""} /></div> */}
                </div>
            </div>
        )
    }
}


const mapStateToFunction = state => {
    return {
        recipe: state.recipe
    }
}


export default connect(mapStateToFunction)(CrafterStats);