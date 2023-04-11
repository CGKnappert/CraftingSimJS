import React, { Component } from 'react';
import './craftingsimulatorpage.css';
import { CrafterActions, CrafterStats, MacroState, RecipeDropdown, MealsNTincture, ClassSelector, CurrentMacro } from '../../containers';
import images from './crafters.js';



class CraftingSimulatorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classImages: images,
            selected: []
        }
    }

    componentDidMount = () => {
        this._isMounted = true;
    }

    setToggleClass = (id) => {
        this.state.classImages[id]["state"] = !this.state.classImages[id]["state"];
        let newSelected = [];
        this.state.classImages.forEach(element => {
            if (element["state"]) {
                newSelected.push(element["shortClass"]);
            }
        });
        this.setState({ selected: newSelected });
    }

    render() {
        console.log("CraftSim render called")
        return (
            <div>
                <div className='stickysim__class-selector'>
                    <ClassSelector setToggleClass={this.setToggleClass} classImages={this.state.classImages} />
                </div>

                <div className='stickysim__recipe-dropdown'>
                    <RecipeDropdown classFilter={this.state.selected} />
                </div>

                <div className='stickysim__crafter-stats'>
                    <CrafterStats />
                </div>

                <div className='stickysim__crafter-meals-and-tincture'>
                    <MealsNTincture />
                </div>

                <div className='stickysim__macro-state'>
                    <MacroState />
                </div>

                <div className='stickysim__current-macro'>
                    <CurrentMacro />
                </div>

                <div className='stickysim__crafter-actions'>
                    <CrafterActions />
                </div>
            </div>
        )
    }
}

export default (CraftingSimulatorPage);