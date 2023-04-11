import React, { Component } from 'react';
import './macrostate.css';
import { connect } from 'react-redux';
import CrafterSim from '../../code/craftingSim.js'
const debug = 1;


class MacroState extends Component {
    constructor(props) {
        super(props);
        const craftSimTemp = new CrafterSim("", 0, 2000, 2000, 500, 90, 0);
        craftSimTemp.loadActions();

        this.state = {
            Craftsmanship: 2000,
            Control: 2000,
            CP: 500,
            recipeDurability: 0,
            currMeal: "",
            currTincture: "",
            currRecipe: "",
            currMacro: [],
            currBuffs: [],
            craftSim: craftSimTemp,
            macroState: {}
        }
    };

    componentDidMount = () => {
        if (debug) console.log("MacroStateDidMount");

        this._isMounted = true;
        if (debug) console.log(this.props.meal, this.props.tincture)
        if (debug) console.log(this.props.macro)

        if (this.props.recipe && this.props.macro && Object.keys(this.state.macroState).length === 0) {
            if (debug) console.log("MacroState Run Macro: ", this.state.craftSim.executeMacro(this.props.macro, false, false));
            this.setState( { macroState: this.state.craftSim.executeMacro(this.props.macro, false, false) } 
            , this.simulatorUpdate);
        }
    }

    componentDidUpdate = () => {
        if (debug) console.log("MacroStateDidUpdate");

        let newMacro = 0;
        let newRecipe = 0;
        let newStats = 0;
        if (this.props.recipe && this.state.currRecipe !== this.props.recipe) {
            if (debug) console.log("MacroState New Recipe: " + this.props.recipe);
            let recipe = this.state.craftSim.setRecipe(this.props.recipe);
            this.setState( {currRecipe: this.props.recipe} );
            if (recipe) this.setState( { recipeDurability: recipe.recipeDurability } )
            newRecipe = 1;
        }

        if (this.props.macro && this.state.currMacro !== this.props.macro) {
            if (debug) console.log("MacroState New Macro: " + this.props.macro);
            this.setState( {currMacro: this.props.macro} );
            newMacro = 1;
        }

        if (Object.keys(this.props.meal).length !== 0 && this.props.meal.Name !== this.state.currMeal) {
            if (debug) console.log("MacroState New Meal: " + this.props.meal.Name);
            this.setState( { currMeal: this.props.meal.Name } )
            newStats = 1;
        }

        if (Object.keys(this.props.tincture).length !== 0 && this.props.tincture.Name !== this.state.currTincture) {
                if (debug) console.log("MacroState New Tincture: " + this.props.tincture.Name);
                this.setState( { currTincture: this.props.tincture.Name } );
                newStats = 1;
        }

        if (this.props.Craftsmanship !== this.state.Craftsmanship || this.props.Control !== this.state.Control || this.props.CP !== this.state.CP ) {
            if (debug) console.log("MacroState New Stats: Cr" + this.props.Craftsmanship + "; Co" + this.props.Control + "; CP:" + this.props.CP);
            this.setState( { Craftsmanship: this.props.Craftsmanship, Control: this.props.Control, CP: this.props.CP } );
            newStats = 1;
        }

        if (newStats) {
            if (debug) console.log("MacroState New Stats: Cr" + (this.props.Craftsmanship + this.props.meal.Craftsmanship + this.props.tincture.Craftsmanship) + " Co" + (this.props.Control + this.props.meal.Control + this.props.tincture.Control) + " CP" + (this.props.CP + this.props.meal.CP + this.props.tincture.CP))
            this.state.craftSim.updateCrafterStats(this.props.Craftsmanship + this.props.meal.Craftsmanship + this.props.tincture.Craftsmanship, this.props.Control + this.props.meal.Control + this.props.tincture.Control, this.props.CP + this.props.meal.CP + this.props.tincture.CP, 90, false)
        }

        if ((this.props.recipe && this.props.macro) && (Object.keys(this.state.macroState).length === 0 || newRecipe || newMacro || newStats)) {
            if (debug) console.log("MacroState Run Macro");
            this.setState( { macroState: this.state.craftSim.executeMacro(this.props.macro, false, false) } 
            , this.simulatorUpdate);
        }
    }

    // componentDidMount = () => {
    //     if (debug) console.log("MacroState did mount");
    //     const macroImages = document.querySelectorAll('.crafting-sim-buffs-active-image');
    //     for (let image of macroImages.entries()) {
    //         image.addEventListener("dragstart", (event) => {event.target.classList.add("dragging");})
            
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("shioudlmacro update");
    //     console.log(this.props);
    //     console.log(nextProps);
    //     if (nextProps.progress !== this.props.progress) return true;
    //     if (nextProps.difficulty !== this.props.difficulty) return true;
    //     if (nextProps.quality !== this.props.progress) return true;
    //     if (nextProps.difficulty !== this.props.recipeQuality) return true;
    //     if (nextProps.CP !== this.props.MaxCP) return true;
    //     if (nextProps.mealCP !== this.props.mealCP) return true;
    //     if (nextProps.tinctureCP !== this.props.tinctureCP) return true;
    //     if (nextProps.currRecipe !== this.props.currRecipe) return true;
    //     return false;
    // }

    simulatorUpdate = () => {
        if (debug) console.log(this.state.macroState);
        try {
            const currProgress = document.querySelector('.crafting-sim-progress-bar-current');
            currProgress.style.width = Math.min(((this.state.macroState.progress / this.state.macroState.recipeDifficulty) * 100), 100) + '%';

            const currQuality = document.querySelector('.crafting-sim-quality-bar-current');
            currQuality.style.width = Math.min(((this.state.macroState.quality / this.state.macroState.recipeQuality) * 100), 100) + '%';

            const currCP = document.querySelector('.crafting-sim-CP-bar-current');
            currCP.style.width = Math.min(((this.state.macroState.currCP / (this.props.CP + this.props.meal.CP + this.props.tincture.CP)) * 100), 100) + '%';

            const currDurability = document.querySelector('.crafting-sim-durability-bar-current');
            currDurability.style.width = Math.min(((this.state.macroState.durability / (this.state.recipeDurability)) * 100), 100) + '%';

            const progressHeader = document.querySelector('.crafting-sim-progress-header-right');
            progressHeader.innerHTML = ('<h3>' + (this.state.macroState.progress) + ' / ' + ((this.state.macroState.recipeDifficulty !== undefined) ? this.state.macroState.recipeDifficulty : 0) + '</h3>');

            const qualityHeader = document.querySelector('.crafting-sim-quality-header-right');
            qualityHeader.innerHTML = ('<h3>' + (this.state.macroState.quality) + ' / ' + ((this.state.macroState.recipeQuality !== undefined) ? this.state.macroState.recipeQuality : 0) + '</h3>');
            
            const CPHeader = document.querySelector('.crafting-sim-CP-header-right');
            CPHeader.innerHTML = ('<h3>' + (this.state.macroState.currCP) + ' / ' + (this.props.CP + this.props.meal.CP + this.props.tincture.CP) + '</h3>');
            
            const durabilityHeader = document.querySelector('.crafting-sim-durability-header-right');
            durabilityHeader.innerHTML = ('<h3>' + (this.state.macroState.durability) + ' / ' + (this.state.recipeDurability) + '</h3>');

            // TODO: make current macro draggable and reactive
            // const imageOne = document.querySelector('.crafting-sim-durability-header-right');

            this.setState({});
        } catch (error) {
            console.log("Not rendered yet: " + error);
        }
    }

    render() {
        if (debug) console.log("Macro state update")
        return (
            <div className="crafting-sim-status-and-buffs-container">
                <div className="crafting-sim-status-container">
                    <div className='crafting-sim-status-title'><h3>Craft Status</h3></div>
                    <div className="crafting-sim-progress-status">
                        <div className="crafting-sim-progress-header">
                            <div className="crafting-sim-progress-header-left">
                                <h3>Craft Progress</h3>
                            </div>
                            <div className="crafting-sim-progress-header-right">
                            </div>
                        </div>
                        <div className="crafting-sim-progress-bar">
                            <span className="crafting-sim-progress-bar-current"></span>
                        </div>
                    </div>

                    <div className="crafting-sim-quality-status">
                        <div className="crafting-sim-quality-header">
                            <div className="crafting-sim-quality-header-left">
                                <h3>Craft Quality</h3>
                            </div>
                            <div className="crafting-sim-quality-header-right">
                            </div>
                        </div>
                        <div className="crafting-sim-quality-bar">
                            <span className="crafting-sim-quality-bar-current"></span>
                        </div>
                    </div>

                    <div className="crafting-sim-durability-status">
                        <div className="crafting-sim-durability-header">
                            <div className="crafting-sim-durability-header-left">
                                <h3>Craft Durability</h3>
                            </div>
                            <div className="crafting-sim-durability-header-right">
                            </div>
                        </div>
                        <div className="crafting-sim-durability-bar">
                            <span className="crafting-sim-durability-bar-current"></span>
                        </div>
                    </div>

                    <div className="crafting-sim-CP-status">
                        <div className="crafting-sim-CP-header">
                            <div className="crafting-sim-CP-header-left">
                                <h3>Crafter CP</h3>
                            </div>
                            <div className="crafting-sim-CP-header-right">
                            </div>
                        </div>
                        <div className="crafting-sim-CP-bar">
                            <span className="crafting-sim-CP-bar-current"></span>
                        </div>
                    </div>

                </div>

            
                <div className="crafting-sim-buffs-active">
                    <div className="crafting-sim-buffs-active-header">
                        <h3>Current Buffs</h3>
                    </div>
                    {Object.keys(this.state.macroState).length > 0 &&
                        <div className="crafting-sim-buffs-active-image">
                            {Object.entries(this.state.macroState.currBuffs)
                                .filter((value, index, arr) => arr.indexOf(value) === index)
                                .filter(([Name]) => (Name !== 'Observe' || Name !== 'Trained Eye'))
                                .map(([Name]) => <div key={Name}><img key={Name} draggable="true" src={require(`../../assets/Buff Icons/${Name}${(Name === 'Inner Quiet') ? this.state.macroState.currBuffs['Inner Quiet'] : ''}.png`)} title={Name} alt={Name} /> 
                                    {Name !== 'Inner Quiet' && <h2 className='crafting-sim-buffs-active-count' key={"Count" + Name}> {this.state.macroState.currBuffs[Name]} </h2>}
                                </div>)}
                            
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToFunction = state => {
    return {
        recipe: state.recipe,
        Craftsmanship: state.Craftsmanship,
        Control: state.Control,
        Durability: state.durability,
        CP: state.CP,
        meal: state.meal,
        tincture: state.tincture,
        macro: state.macro
    }
}

export default connect(mapStateToFunction)(MacroState);