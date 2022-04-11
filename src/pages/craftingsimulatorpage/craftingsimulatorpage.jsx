import React, { Component } from 'react';
import './craftingsimulatorpage.css';
import { CrafterActions, CrafterStats, MacroState, RecipeDropdown, MealsNTincture, ClassSelector, CurrentBuffs, CurrentMacro } from '../../containers';
import Asyncstorage from '@react-native-async-storage/async-storage';
import CrafterSim from '../../code/craftingSim.js'
import images from './crafters.js';
import { setMeal, setTincture } from '../../context/index'
import { connect } from 'react-redux';



class CraftingSimulatorPage extends Component {
    constructor(props) {
        super(props);
        let tempSim = new CrafterSim("", 0, 2000, 2000, 500, 90, 0);
        tempSim.loadActions();
        this.state = {
            classImages: images,
            selected: [],
            craftActions: [],
            currMacro: [],
            currBuffs: {},
            durability: 0,
            progress: 0,
            difficulty: 0,
            quality: 0,
            recipeQuality: 0,
            currCP: 0,
            craftSim: tempSim
        }
    }

    componentDidMount = () => {
        this._isMounted = true;
        this.simulatorUpdate();
        // this.state.craftSim.setRecipe(this.props.recipe);
        // this.state.craftSim.executeMacro(this.props.macro, false, false);
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }
    
    componentDidUpdate = () => {
        // this.simulatorUpdate();
        // let tempMacro = this.props.macro;
        // let tempRecipe = this.props.recipe;
        // this.state.craftSim.setRecipe(tempRecipe);
        this.simulatorUpdate();
        // console.log(this.state.craftSim.difficulty)
        // this.state.craftSim.executeMacro(tempMacro, false, false);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // this.simulatorUpdate();
        if (nextProps.recipe !== this.props.recipe) return true;
        if (nextProps.meal !== this.props.meal) return true;
        if (nextProps.tincture !== this.props.tincture) return true;
        if (nextState.selected !== this.state.selected) return true;
        if (this.state.difficulty !== this.state.craftSim.difficulty) return true;
        if (this.state.currRecipe !== this.state.craftSim.recipe) return true;
        if (nextProps.macro !== this.state.currMacro) return true;
        return false;
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

    simulatorUpdate = () => {
        console.log("SimUp")
        console.log(this.props.meal)
        console.log(this.props.tincture)
        this.state.craftSim.updateCrafterStats(
            this.props.Craftsmanship + this.props.meal.Craftsmanship + this.props.tincture.Craftsmanship,
            this.props.Control + this.props.meal.Control + this.props.tincture.Control,
            this.props.CP + this.props.meal.CP + this.props.tincture.CP,
            90, 
            0
        )

        let tempMacro = this.props.macro;
        let tempRecipe = this.props.recipe;
        this.state.craftSim.setRecipe(tempRecipe);
        this.state.craftSim.executeMacro(tempMacro, false, false);

        this.setState({
            currMacro: this.props.macro,
            durability: this.state.craftSim.durability,
            difficulty: this.state.craftSim.difficulty,
            progress: this.state.craftSim.progress,
            quality: this.state.craftSim.quality,
            recipeQuality: this.state.craftSim.recipeQuality,
            currCP: this.state.craftSim.CP,
            currBuffs: this.state.craftSim.activeBuffs
        })
    }
    
    simulatorRefresh = () => {
        console.log("forceup")
        // this.forceUpdate();
    }

    render() {
        console.log("CraftSim render called")
        return (
            <div>
                <div className='stickysim__header-content'>
                    <h1 className='gradient__text'>FFXIV Crafting Simulator</h1>
                </div>

                <div className='stickysim__class-selector'>
                    <ClassSelector setToggleClass={this.setToggleClass} classImages={this.state.classImages} />
                </div>

                <div className='stickysim__recipe-dropdown'>
                    <RecipeDropdown classFilter={this.state.selected} simulatorUpdate={this.simulatorUpdate} simulatorRefresh={this.simulatorRefresh} />
                </div>

                <div className='stickysim__crafter-stats'>
                    <CrafterStats currRecipe={this.props.recipe} simulatorUpdate={this.simulatorUpdate} />
                </div>

                <div className='stickysim__crafter-meals-and-tincture'>
                    <MealsNTincture simulatorUpdate={this.simulatorUpdate} simulatorRefresh={this.simulatorRefresh}  />
                </div>

                <div className='stickysim__macro-state'>
                    <MacroState progress={this.state.progress} difficulty={this.state.difficulty} quality={this.state.craftSim.quality} recipeQuality={this.state.craftSim.recipeQuality} currCP={this.state.currCP} currRecipe={this.props.recipe}  />
                </div>

                <div className='stickysim__current-buffs'>
                    <CurrentBuffs currBuffs={ this.state.currBuffs } />
                </div>

                <div className='stickysim__current-macro'>
                    <CurrentMacro simulatorUpdate={this.simulatorUpdate} />
                </div>

                <div className='stickysim__crafter-actions'>
                    <CrafterActions setMacro={this.state.setMacro} currMacro={this.props.macro} craftSim={this.state.craftSim} simulatorUpdate={this.simulatorUpdate} />
                </div>
            </div>
        )
    }
}


const mapStateToFunction = state => {
    return {
        Craftsmanship: state.Craftsmanship,
        Control: state.Control,
        CP: state.CP,
        recipe: state.recipe,
        meal: state.meal,
        tincture: state.tincture,
        macro: state.macro
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMeal: (meal) => dispatch(setMeal(meal)),
        setTincture: (tincture) => dispatch(setTincture(tincture))
    }
}

export default connect(mapStateToFunction, mapDispatchToProps)(CraftingSimulatorPage);