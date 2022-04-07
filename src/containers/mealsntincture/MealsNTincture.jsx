import React, { Component } from 'react';
import './mealsntincture.css';
import { setMeal, setTincture } from '../../context/index'
import { connect } from 'react-redux';

class MealsNTincture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mealBonusCraftsmanship: 0,
            mealBonusControl: 0,
            mealBonusCP: 0,
            tinctureBonusCraftsmanship: 0,
            tinctureBonusControl: 0,
            tinctureBonusCP: 0,
            currMeal: {},
            currTinct: {},
            mealArray: [],
            tinctureArray: [],
            isMealHQ: false,
            isTinctureHQ: false,
            isMealActive: false,
            isTinctureActive: false
        }
    };

    componentDidMount = () => {
        let mealsTemp = require('../../JSON/Meals.json');
        let allMealsVerifiedTemp = [];
        for (const meal of mealsTemp.Results) {
            try {
                if (meal.Bonuses.hasOwnProperty("Craftsmanship") || meal.Bonuses.hasOwnProperty("Control") || meal.Bonuses.hasOwnProperty("CP")) {
                    allMealsVerifiedTemp.push(meal);
                }
            }
            catch {
            }
        }
        let tinctureTemp = require('../../JSON/Tinctures.json');

        this.setState({
            mealArray: allMealsVerifiedTemp,
            tinctureArray: tinctureTemp.Results
        })

        var mealInput = document.getElementById("mealInput");
        mealInput.onfocus = () => {
            if (mealInput.value === 'Select a meal') {
                mealInput.value = '';
            }
            this.setState({ isMealActive: true });
        }

        mealInput.onblur = () => {
            if (mealInput.value === '') {
                mealInput.value = 'Select a meal';
            }
            this.setState({ isMealActive: false });
        }

        var tinctureInput = document.getElementById("tinctureInput");
        tinctureInput.onfocus = () => {
            if (tinctureInput.value === 'Select a tincture') {
                tinctureInput.value = '';
            }
            this.setState({ isTinctureActive: true });
        }

        tinctureInput.onblur = () => {
            if (tinctureInput.value === '') {
                tinctureInput.value = 'Select a tincture';
            }
            this.setState({ isTinctureActive: false });
        }
    }

    toggleMealHQ = () => {
        if (this.props.meal !== undefined) {
            this.setState({
                isMealHQ: !this.state.isMealHQ,
                mealBonusCraftsmanship: (this.state.currMeal.Bonuses.Craftsmanship !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.Craftsmanship.MaxHQ : this.state.currMeal.Bonuses.Craftsmanship.Max) : 0,
                mealBonusControl: (this.state.currMeal.Bonuses.Control !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.Control.MaxHQ : this.state.currMeal.Bonuses.Control.Max) : 0,
                mealBonusCP: (this.state.currMeal.Bonuses.CP !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.CP.MaxHQ : this.state.currMeal.Bonuses.CP.Max) : 0
            });

            this.props.craftSim.updateCrafterStats(parseInt(this.state.craftsmanshipStat) + parseInt((this.state.currMeal.Bonuses.Craftsmanship !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.Craftsmanship.MaxHQ : this.state.currMeal.Bonuses.Craftsmanship.Max) : 0),
                parseInt(this.state.controlStat) + parseInt((this.state.currMeal.Bonuses.Control !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.Control.MaxHQ : this.state.currMeal.Bonuses.Control.Max) : 0),
                parseInt(this.state.cpStat) + parseInt((this.state.currMeal.Bonuses.CP !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.CP.MaxHQ : this.state.currMeal.Bonuses.CP.Max) : 0), 90, 0);
        }

        this.props.simulatorUpdate();
    }

    clearMealSearch = () => {
        let mealInput = document.getElementById("mealInput");
        mealInput.value = '';
        this.setState({
            isMealActive: true,
            currMeal: null,
            mealBonusCraftsmanship: 0,
            mealBonusControl: 0,
            mealBonusCP: 0
        });
    }

    clearTinctureSearch = () => {
        let tinctureInput = document.getElementById("tinctureInput");
        tinctureInput.value = '';
        this.setState({ isTinctureActive: true });
    }

    updateMeal = (value) => {
        const newValue = value;
        let mealInput = document.getElementById("mealInput");

        this.props.setMeal(newValue);

        mealInput.value = newValue;
        for (const meal of this.state.mealArray) {
            if (meal.Name === newValue) {
                this.setState({
                    currMeal: meal,
                    mealBonusCraftsmanship: (meal.Bonuses.Craftsmanship !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.Craftsmanship.MaxHQ : meal.Bonuses.Craftsmanship.Max) : 0,
                    mealBonusControl: (meal.Bonuses.Control !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.Control.MaxHQ : meal.Bonuses.Control.Max) : 0,
                    mealBonusCP: (meal.Bonuses.CP !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.CP.MaxHQ : meal.Bonuses.CP.Max) : 0
                });

                // TODO: Update Lvl and Specialist
                this.props.craftSim.updateCrafterStats(parseInt(this.state.craftsmanshipStat) + parseInt((meal.Bonuses.Craftsmanship !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.Craftsmanship.MaxHQ : meal.Bonuses.Craftsmanship.Max) : 0),
                    parseInt(this.state.controlStat) + parseInt((meal.Bonuses.Control !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.Control.MaxHQ : meal.Bonuses.Control.Max) : 0),
                    parseInt(this.state.cpStat) + parseInt((meal.Bonuses.CP !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.CP.MaxHQ : meal.Bonuses.CP.Max) : 0), 90, 0);
                break;
            }
        }


        this.setState({ isMealActive: false });
        this.props.simulatorUpdate();
    }

    updateMealSearch = () => {
        let mealInput = document.getElementById("mealInput");
        this.setState({ mealSearch: mealInput.value });
    }

    updateTincture = () => {
        let tinctInput = document.getElementById("tinctureInput");
        this.setState({ currTinct: tinctInput.value });
        this.setState({ isTinctActive: false });
        this.props.simulatorUpdate();
        this.props.setTincture()
    }

    updateTinctureSearch = () => {
        let tinctureInput = document.getElementById("tinctureInput");
        this.setState({ tinctureSearch: tinctureInput.value });
    }

    render() {
        return (
            <div className="crafting-sim-meal-and-tincture-container">
                <div className="crafting-sim-meal-container">
                    <div className="crafting-sim-meal-dropdown-search-title"><p>Meals</p></div>
                    <input className="crafting-sim-meal-dropdown-button"
                        onChange={() => this.updateMealSearch()}
                        type="text"
                        name="mealInput"
                        id="mealInput"
                        autoComplete="off"
                    />
                    <img src={require(`../../assets/HQIcon.png`)} className='crafting-sim-meal-dropdown-hq-icon' alt="mealHQ" onClick={this.toggleMealHQ} style={this.state.isMealHQ ? { opacity: 1 } : { opacity: 0.2 }} />
                    <img src={require(`../../assets/clear.png`)} className='crafting-sim-meal-dropdown-clear-icon' alt="mealCear" onClick={this.clearMealSearch} />
                    {this.state.isMealActive &&
                        <div className="crafting-sim-meal-dropdown-content">
                            {this.state.mealArray
                                // sort by ilvl desc
                                .sort((a, b) => b.LevelItem - a.LevelItem)
                                //Map Name to image and div display
                                .map((x) => (
                                    <div
                                        onMouseDown={this.updateMeal.bind(this, x.Name)}
                                        key={x.Name}
                                        className="crafting-sim-meal-dropdown-meal" >
                                        <img src={require(`../../assets/Meals/${x.Name}.png`)} className="crafting-sim-meal-dropdown-meal-icon" alt="x.Name" />
                                        <div className="crafting-sim-meal-dropdown-meal-name">{x.Name} </div>
                                    </div>
                                ))}
                        </div>
                    }
                    <div className="crafting-sim-meal-text">
                        <div className="crafting-sim-meal-text-craftsmanship">
                            Cr: {this.state.mealBonusCraftsmanship}
                        </div>
                        <div className="crafting-sim-meal-text-control">
                            Co: {this.state.mealBonusControl}
                        </div>
                        <div className="crafting-sim-meal-text-CP">
                            CP: {this.state.mealBonusCP}
                        </div>
                        <div className="crafting-sim-meal-text-lvl">
                            iLvl: {(this.state.currMeal !== null && Object.keys(this.state.currMeal).length > 0 && this.state.currMeal.LevelItem !== undefined) ? this.state.currMeal.LevelItem : 0}
                        </div>
                    </div>
                </div>

                <div className="crafting-sim-tincture-container">
                    <div className="crafting-sim-tincture-dropdown-search-title"><p>Tinctures</p></div>
                    <input className="crafting-sim-tincture-dropdown-button"
                        onChange={() => this.updateTinctureSearch()}
                        type="text"
                        name="tinctureInput"
                        id="tinctureInput"
                        autoComplete="off"
                    />
                    <img src={require(`../../assets/HQIcon.png`)} className='crafting-sim-tincture-dropdown-hq-icon' alt="tinctureHQ" onClick={this.toggleTinctureHQ} style={this.state.isTinctureHQ ? { opacity: 1 } : { opacity: 0.2 }} />
                    <img src={require(`../../assets/clear.png`)} className='crafting-sim-tincture-dropdown-clear-icon' alt="tinctureCear" onClick={this.clearTinctureSearch} />
                    {this.state.isTinctureActive &&
                        <div className="crafting-sim-tincture-dropdown-content">
                            {this.state.tinctureArray
                                // sort by ilvl desc
                                .sort((a, b) => b.LevelItem - a.LevelItem)
                                //Map Name to image and div display
                                .map((x) => (
                                    <div
                                        onMouseDown={this.updateTincture.bind(this, x.Name)}
                                        key={x.Name}
                                        className="crafting-sim-tincture-dropdown-tincture" >
                                        <img src={require(`../../assets/Tinctures/${x.Name}.png`)} className="crafting-sim-tincture-dropdown-tincture-icon" alt="x.Name" />
                                        <div className="crafting-sim-tincture-dropdown-tincture-name">{x.Name} </div>
                                    </div>
                                ))}
                        </div>
                    }
                    {/* <div className="crafting-sim-tincture-text">
                        <div className="crafting-sim-tincture-text-craftsmanship">
                            Cr: {this.state.tinctureBonusCraftsmanship}
                        </div>
                        <div className="crafting-sim-tincture-text-control">
                            Co: {this.state.tinctureBonusControl}
                        </div>
                        <div className="crafting-sim-tincture-text-CP">
                            CP: {this.state.tinctureBonusCP}
                        </div>
                        <div className="crafting-sim-meal-text-lvl">
                            iLvl: {(this.state.currTincure !== null && Object.keys(this.state.currTincure).length > 0 && this.state.currTincure.LevelItem !== undefined) ? this.state.currTincure.LevelItem : 0}
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

const mapStateToFunction = state => {
    return {
        meal: state.meal,
        tincture: state.tincture
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMeal: (meal) => dispatch(setMeal(meal)),
        setTincture: (tincture) => dispatch(setTincture(tincture))
    }
}

export default connect(mapStateToFunction, mapDispatchToProps)(MealsNTincture);
