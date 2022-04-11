import React, { Component } from 'react';
import CrafterSim from '../../code/craftingSim.js'
import './macrostate.css';
import { connect } from 'react-redux';



class MacroState extends Component {
    constructor(props) {
        super(props);
            this.state = { 
        //         currBuffs: {},
        //         currDurability: 0,
                currProgress: props.progress,
        //         currQuality: 0,
        //         currCP: 0
            }
    }
    componentDidMount = () => {
        this._isMounted = true;
        this.simulatorUpdate();
    }

    componentDidUpdate = () => {
        this.simulatorUpdate()
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shioudlmacro update");
        console.log(nextProps);
        console.log(this.props);
        console.log(nextState);
        if (nextProps.progress !== this.props.progress) return true;
        if (nextProps.difficulty !== this.props.difficulty) return true;
        if (nextProps.quality !== this.props.progress) return true;
        if (nextProps.difficulty !== this.props.recipeQuality) return true;
        if (nextProps.CP !== this.props.MaxCP) return true;
        if (nextProps.mealCP !== this.props.mealCP) return true;
        if (nextProps.tinctureCP !== this.props.tinctureCP) return true;
        if (nextProps.currRecipe !== this.props.currRecipe) return true;
        return false;
    }

    simulatorUpdate = () => {
        try {
            const currProgress = document.querySelector('.crafting-sim-progress-bar-current');
            currProgress.style.width = Math.min(((this.props.progress / this.props.difficulty) * 100), 100) + '%';
            currProgress.style.opacity = 1;

            const currQuality = document.querySelector('.crafting-sim-quality-bar-current');
            currQuality.style.width = Math.min(((this.props.quality / this.props.recipeQuality) * 100), 100) + '%';
            currQuality.style.opacity = 1;

            const currCP = document.querySelector('.crafting-sim-CP-bar-current');
            currCP.style.width = Math.min(((this.props.CP / this.props.MaxCP + this.props.mealCP + this.props.tinctureCP) * 100), 100) + '%';
            currCP.style.opacity = 1;

            const progressHeader = document.querySelector('.crafting-sim-progress-header-right');
            progressHeader.innerHTML = ('<h3>' + (this.props.progress) + ' / ' + ((this.props.difficulty !== undefined) ? this.props.difficulty : 0) + '</h3>');

            const qualityHeader = document.querySelector('.crafting-sim-quality-header-right');
            qualityHeader.innerHTML = ('<h3>' + (this.props.quality) + ' / ' + ((this.props.recipeQuality !== undefined) ? this.props.recipeQuality : 0) + '</h3>');

            const CPHeader = document.querySelector('.crafting-sim-CP-header-right');
            CPHeader.innerHTML = ('<h3>' + (this.props.CP) + ' / ' + (this.props.MaxCP + this.props.mealCP + this.props.tinctureCP) + '</h3>');

        } catch (error) {
            console.log("Not rendered yet: " + error)
        }
    }

    render() {
        console.log("Macro state update")
        return (
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
        )
    }
}

const mapStateToFunction = state => {
    return {
        MaxCP: state.CP,
        mealCP: state.meal.CP,
        tinctureCP: state.tincture.CP
    }
}

export default connect(mapStateToFunction)(MacroState);