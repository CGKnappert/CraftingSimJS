import React, { Component } from 'react';
import './recipedropdown.css';
import { setRecipe } from '../../context/index'
import { connect } from 'react-redux';

class RecipeDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            recipeNames: {},
            recipesAll: []
        };
    }

    componentDidMount = () => {
        this._isMounted = true;
        // this.loadData();
        let allRecipesTemp = require('../../JSON/CraftRecipe.json');
        let allRecipesVerifiedTemp = [];
        for (const recipe of allRecipesTemp) {
            try {
                if (recipe.RecipeLevelTable.ClassJobLevel > 0 && allRecipesVerifiedTemp) {
                    allRecipesVerifiedTemp.push(recipe);
                }
            }
            catch {
                // TODO
            }
        }
        allRecipesVerifiedTemp = [...new Map(allRecipesVerifiedTemp.map(item => [item.Name, item])).values()];

        this.setState({
            classFilter: '',
            recipesAll: allRecipesVerifiedTemp
        })

        var recipeInput = document.getElementById("recipeInput");
        if (this.props.recipe) {
            recipeInput.value = this.props.recipe;
        }

        recipeInput.onfocus = () => {
            if (recipeInput.value === 'Select a recipe') {
                recipeInput.value = '';
            }
            this.filterSearch();
            this.setState({ isActive: true });
        }
        recipeInput.onblur = () => {
            if (recipeInput.value === '') {
                recipeInput.value = 'Select a recipe';
            }
            this.setState({ isActive: false });
        }
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    filterSearch = () => {
        let cls = this.props.classFilter;
        if (this.props.classFilter.length > 0) {
            let recipesAllTemp = this.state.recipesAll.filter((value) => cls.includes(value.ClassJob.Abbreviation))
            const recipeArray = [];
            for (let recipe of recipesAllTemp) {
                recipeArray.push({ "Name": recipe.Name, "ClassJobLevel": recipe.RecipeLevelTable.ClassJobLevel });
            }
            this.setState({ recipeNames: recipeArray });
        }
        else {
            const recipeArray = [];
            for (let recipe of this.state.recipesAll) {
                recipeArray.push({ "Name": recipe.Name, "ClassJobLevel": recipe.RecipeLevelTable.ClassJobLevel });
            }
            this.setState({ recipeNames: recipeArray })
        }
    }

    clearSearch = () => {
        let recipeInput = document.getElementById("recipeInput");
        recipeInput.value = '';
        recipeInput.focus();
    }

    updateRecipeSearch = () => {
        let recipeInput = document.getElementById("recipeInput");
        this.setState( {search: recipeInput.value} );
    }

    chooseOption = (value) => {
        const newValue = value;
        console.log(newValue)
        this.props.setRecipe(newValue);
        this.setState({ isActive: false });
        let recipeInput = document.getElementById("recipeInput")
        recipeInput.value = newValue;
    }

    render() {
        return (
            <div className="recipe-dropdown" >
                <div className="recipe-dropdown-search-title"><p>Recipes</p></div>
                <input className="recipe-dropdown-button"
                    onChange={() => this.updateRecipeSearch()}
                    type="text"
                    name="recipeInput"
                    id="recipeInput"
                    autoComplete="off"
                    spellCheck="false"
                    // value={((this.props.recipe !== "" && typeof this.props.recipe === 'string') ? this.props.recipe : "Select a recipe")}
                    placeholder= 'Select a recipe'
                />
                <img src={require(`../../assets/clear.png`)} className='recipe-dropdown-clear-icon' alt='clear' onClick={this.clearSearch} />
                {this.state.isActive &&
                    <div className="recipe-dropdown-content">
                            {this.state.recipeNames
                                //Apply unique filter
                                .filter((value, index, arr) => arr.indexOf(value) === index)
                                //Apply text search filter
                                .filter((x) => typeof x.Name === 'string' && x.Name !== '' && x.Name.match(new RegExp(document.getElementById("recipeInput").value, "i")))
                                //Map Name to image and div display
                                .map((x) => (
                                    <div
                                        onMouseDown={this.chooseOption.bind(this, x.Name)}
                                        key={x.Name}
                                        className="recipe-dropdown-item" >
                                        {/* <LazyLoad height={40}> */}
                                        <img src={require(`../../assets/RecipeIcons/${x.Name}.png`)} alt='recipe-icon' className="recipe-dropdown-icon" />
                                        {/* </LazyLoad> */}
                                        <div className="recipe-dropdown-name">{x.Name}</div>
                                        <div className="recipe-dropdown-level">Level {x.ClassJobLevel}</div>
                                    </div>
                                )
                                )}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToFunction = state => {
    return {
        recipe: state.recipe
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setRecipe: (recipe) => dispatch(setRecipe(recipe))
    }
}

export default connect(mapStateToFunction, mapDispatchToProps)(RecipeDropdown);