import React, { Component } from 'react';
import './macrostate.css';
import { connect } from 'react-redux';



class MacroState extends Component {
    
    componentDidMount = () => {
        this._isMounted = true;
        this.simulatorUpdate();
    }

    componentDidUpdate = () => {
        this.simulatorUpdate()
    }

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
        console.log(this.props)
        try {
            const currProgress = document.querySelector('.crafting-sim-progress-bar-current');
            currProgress.style.width = Math.min(((this.props.macroState.progress / this.props.difficulty) * 100), 100) + '%';
            currProgress.style.opacity = 1;

            const currQuality = document.querySelector('.crafting-sim-quality-bar-current');
            currQuality.style.width = Math.min(((this.props.macroState.quality / this.props.recipeQuality) * 100), 100) + '%';
            currQuality.style.opacity = 1;

            const currCP = document.querySelector('.crafting-sim-CP-bar-current');
            currCP.style.width = Math.min(((this.props.macroState.currCP / this.props.CP + this.props.mealCP + this.props.tinctureCP) * 100), 100) + '%';
            currCP.style.opacity = 1;

            const progressHeader = document.querySelector('.crafting-sim-progress-header-right');
            progressHeader.innerHTML = ('<h3>' + (this.props.macroState.progress) + ' / ' + ((this.props.macroState.difficulty !== undefined) ? this.props.macroState.difficulty : 0) + '</h3>');

            const qualityHeader = document.querySelector('.crafting-sim-quality-header-right');
            qualityHeader.innerHTML = ('<h3>' + (this.props.macroState.quality) + ' / ' + ((this.props.macroState.recipeQuality !== undefined) ? this.props.macroState.recipeQuality : 0) + '</h3>');

            const CPHeader = document.querySelector('.crafting-sim-CP-header-right');
            CPHeader.innerHTML = ('<h3>' + (this.props.macroState.currCP) + ' / ' + (this.props.CP + this.props.mealCP + this.props.tinctureCP) + '</h3>');

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
        CP: state.CP,
        mealCP: state.meal.CP,
        tinctureCP: state.tincture.CP,
        macroState: state.macroState
    }
}

export default connect(mapStateToFunction)(MacroState);