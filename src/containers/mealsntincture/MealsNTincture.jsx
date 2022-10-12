import React, { Component } from 'react';
import './mealsntincture.css';
import { setMeal, setTincture } from '../../context/index'
import { connect } from 'react-redux';

class MealsNTincture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mealArray: [],
            tinctureArray: [],
            currMeal: null,
            currTincture: null,
            isMealHQ: false,
            isTinctureHQ: false,
            isMealActive: false,
            isTinctureActive: false
        }
    };

    componentDidMount = () => {
        let mealsTemp = require('../../JSON/Meals.json');
        let tinctureTemp = require('../../JSON/Tinctures.json');
        console.log(this.props.meal.Name)

        this.setState({
            mealArray: mealsTemp.Results,
            tinctureArray: tinctureTemp.Results
        })

        var mealInput = document.getElementById("mealInput");
        mealInput.onfocus = () => {
            if (mealInput.value === 'Select a meal') {
                mealInput.value = this.props.meal.Name;
            }
            this.setState({ isMealActive: true });
        }

        // mealInput.onblur = () => {
        //     if (mealInput.value === '') {
        //         mealInput.value = 'Select a meal';
        //     }
        //     this.setState({ isMealActive: false });
        // }

        var tinctureInput = document.getElementById("tinctureInput");
        tinctureInput.onfocus = () => {
            if (tinctureInput.value === 'Select a tincture') {
                mealInput.value = this.props.tincture.Name;
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
        if (this.state.currMeal !== undefined) {
            let isHQ = !this.state.isMealHQ;
            this.setState({
                isMealActive: false,
                isMealHQ: !this.state.isMealHQ
            });

            this.props.setMeal(
                {
                    Name: this.state.currMeal.Name,
                    Craftsmanship: (this.state.currMeal.Bonuses.Craftsmanship !== undefined) ? (isHQ ? this.state.currMeal.Bonuses.Craftsmanship.MaxHQ : this.state.currMeal.Bonuses.Craftsmanship.Max) : 0,
                    Control: (this.state.currMeal.Bonuses.Control !== undefined) ? (isHQ ? this.state.currMeal.Bonuses.Control.MaxHQ : this.state.currMeal.Bonuses.Control.Max) : 0,
                    CP: (this.state.currMeal.Bonuses.CP !== undefined) ? (isHQ ? this.state.currMeal.Bonuses.CP.MaxHQ : this.state.currMeal.Bonuses.CP.Max) : 0,
                    LevelItem: this.state.currMeal.LevelItem
                }
            )
        }
    }

    clearMealSearch = () => {
        let mealInput = document.getElementById("mealInput");
        mealInput.value = '';
        this.props.setMeal(
            {
                Craftsmanship: 0,
                Control: 0,
                CP: 0
            }
        )
    }

    updateMeal = (value) => {
        console.log("Set food" + value)
        const newValue = value;
        let mealInput = document.getElementById("mealInput");

        mealInput.value = newValue;
        for (const meal of this.state.mealArray) {
            if (meal.Name === newValue) {
                this.setState({
                    isMealActive: false
                });
                this.props.setMeal(
                    {
                        Name: newValue,
                        Craftsmanship: (meal.Bonuses.Craftsmanship !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.Craftsmanship.MaxHQ : meal.Bonuses.Craftsmanship.Max) : 0,
                        Control: (meal.Bonuses.Control !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.Control.MaxHQ : meal.Bonuses.Control.Max) : 0,
                        CP: (meal.Bonuses.CP !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.CP.MaxHQ : meal.Bonuses.CP.Max) : 0,
                        LevelItem: meal.LevelItem
                    }
                )

                // TODO: Update Lvl and Specialist
                // this.props.craftSim.updateCrafterStats(parseInt(this.state.craftsmanshipStat) + parseInt((meal.Bonuses.Craftsmanship !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.Craftsmanship.MaxHQ : meal.Bonuses.Craftsmanship.Max) : 0),
                //     parseInt(this.state.controlStat) + parseInt((meal.Bonuses.Control !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.Control.MaxHQ : meal.Bonuses.Control.Max) : 0),
                //     parseInt(this.state.cpStat) + parseInt((meal.Bonuses.CP !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.CP.MaxHQ : meal.Bonuses.CP.Max) : 0), 90, 0);
                break;
            }
        }
    }

    updateMealSearch = () => {
        let mealInput = document.getElementById("mealInput");
        this.setState({ mealSearch: mealInput.value });
    }

    updateTincture = (value) => {
        const newValue = value;
        let tinctureInput = document.getElementById("tinctureInput");
        tinctureInput.value = newValue;

        
        for (const tincture of this.state.tinctureArray) {
            if (tincture.Name === newValue) {
                this.setState({
                    isTinctureActive: false,
                    currTincture: tincture,
                });

                this.props.setTincture(
                    {
                        Name: newValue,
                        Craftsmanship: (tincture.Bonuses.Craftsmanship !== undefined) ? (this.state.isTinctureHQ ? tincture.Bonuses.Craftsmanship.MaxHQ : tincture.Bonuses.Craftsmanship.Max) : 0,
                        Control: (tincture.Bonuses.Control !== undefined) ? (this.state.isTinctureHQ ? tincture.Bonuses.Control.MaxHQ : tincture.Bonuses.Control.Max) : 0,
                        CP: (tincture.Bonuses.CP !== undefined) ? (this.state.isTinctureHQ ? tincture.Bonuses.CP.MaxHQ : tincture.Bonuses.CP.Max) : 0
                    }
                )

            }
        }
    }

    toggleTinctureHQ = () => {
        console.log(this.state.currTincture);
        if (this.state.currTincture !== undefined) {
            let isHQ = !this.state.isTinctureHQ;
            this.setState({
                isTinctureActive: false,
                isTinctureHQ: !this.state.isTinctureHQ
            });

            this.props.setTincture(
                {
                    Name: this.state.currTincture.Name,
                    Craftsmanship: (this.state.currTincture.Bonuses.Craftsmanship !== undefined) ? (isHQ ? this.state.currTincture.Bonuses.Craftsmanship.MaxHQ : this.state.currTincture.Bonuses.Craftsmanship.Max) : 0,
                    Control: (this.state.currTincture.Bonuses.Control !== undefined) ? (isHQ ? this.state.currTincture.Bonuses.Control.MaxHQ : this.state.currTincture.Bonuses.Control.Max) : 0,
                    CP: (this.state.currTincture.Bonuses.CP !== undefined) ? (isHQ ? this.state.currTincture.Bonuses.CP.MaxHQ : this.state.currTincture.Bonuses.CP.Max) : 0

                }
            )
        }
    }

    updateTinctureSearch = () => {
        let tinctureInput = document.getElementById("tinctureInput");
        this.setState({ tinctureSearch: tinctureInput.value });
    }

    clearTinctureSearch = () => {
        let tinctureInput = document.getElementById("tinctureInput");
        tinctureInput.value = '';
        this.setState({ isTinctureActive: false });
        this.props.setTincture(
            {
                Craftsmanship: 0,
                Control: 0,
                CP: 0
            }
        )
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
                            Cr: {this.props.meal.Craftsmanship}
                        </div>
                        <div className="crafting-sim-meal-text-control">
                            Co: {this.props.meal.Control}
                        </div>
                        <div className="crafting-sim-meal-text-CP">
                            CP: {this.props.meal.CP}
                        </div>
                        <div className="crafting-sim-meal-text-lvl">
                            iLvl: {(this.props.meal !== null && Object.keys(this.props.meal).length > 0 && this.props.meal.LevelItem !== undefined) ? this.props.meal.LevelItem : 0}
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
                    <div className="crafting-sim-tincture-text">
                        <div className="crafting-sim-tincture-text-craftsmanship">
                            Cr: {this.props.tincture.Craftsmanship}
                        </div>
                        <div className="crafting-sim-tincture-text-control">
                            Co: {this.props.tincture.Control}
                        </div>
                        <div className="crafting-sim-tincture-text-CP">
                            CP: {this.props.tincture.CP}
                        </div>
                        {/* <div className="crafting-sim-tincture-text-lvl">
                            iLvl: {(this.state.currTincture !== null && Object.keys(this.state.currTincture).length > 0 && this.state.currTincture.LevelItem !== undefined) ? this.state.currTincture.LevelItem : 0}
                        </div> */}
                    </div>
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
