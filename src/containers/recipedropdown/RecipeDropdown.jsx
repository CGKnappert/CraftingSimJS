import { Component, useState } from 'react';
import './recipedropdown.css';
import recipeJSONFile from '../../JSON/CraftRecipe.json'
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import $ from 'jquery';
import CustomScroll from 'react-custom-scroll';




class RecipeDropDownList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selected: props.recipe,
            search: '',
            isActive: false,
            classFilter: [],
            recipeNames: [],
            recipesAll: []
        }; 
    }

    componentDidMount = () =>  {
        this.setState( {
            classFilter: '',
            recipesAll: require('../../JSON/CraftRecipe.json'),
        })

        var input = document.getElementById("recipeInput");
        input.onfocus = () => {
            if (input.value === 'Select a recipe') {
                input.value = '';
            }
            this.filterSearch();
            this.setState({isActive : true});
          }
          input.onblur = () => {
            if (input.value === '') {
                input.value = 'Select a recipe';
            }
            this.setState({isActive : false})
          }
    }

    filterSearch = () => {
        let cls = this.props.classFilter;
        if (this.props.classFilter.length > 0) {
            this.setState({ recipeNames : this.state.recipesAll.filter((value) => cls.includes(value.ClassJob.Abbreviation) ).map(({Name}) => Name) });
        }
        else {
            this.setState({ recipeNames : this.state.recipesAll.map(({Name}) => Name) })
        }
    }

    updateSearch = () => {
        let recipeInput = document.getElementById("recipeInput");
        this.setState( {search: recipeInput.value} );
    }

    clearSearch = () => {
        let recipeInput = document.getElementById("recipeInput");
        recipeInput.value = '';
    }

    
    chooseOption = (value) => {
        const newValue = value;
        this.setState( {selected: newValue} );
        this.setState( {isActive: false} );
        let recipeInput = document.getElementById("recipeInput")
        recipeInput.value = newValue;
        console.log('update: ' + newValue);
        this.props.setRecipe(newValue);
    }

    render() {
        return (
            <div className="recipe-dropdown" >
                <div className="recipe-dropdown-search-title"><p>Recipes</p></div>
                <input className="recipe-dropdown-button" 
                    onChange={ () => this.updateSearch() }
                    type="text"
                    name="recipeInput"
                    id="recipeInput"
                    autoComplete="off"
                />
                <img src={require(`../../assets/clear.png`)} className='recipe-dropdown-clear-icon' onClick={ this.clearSearch }/>
                {this.state.isActive &&
                <div className="recipe-dropdown-content">
                    <div>
                        {this.state.recipeNames
                            //Apply unique filter
                            .filter((value, index, arr) => arr.indexOf(value) === index)
                            //Apply text search filter
                            .filter((Name) => typeof Name === 'string' && Name !== '' && Name.match(new RegExp(document.getElementById("recipeInput").value, "i")))
                            //Map Name to image and div display
                            .map((Name) => (
                                <div 
                                    onMouseDown={ this.chooseOption.bind(this, Name) }
                                    key={ Name }
                                    className="recipe-dropdown-item" >
                                    <img src={require(`../../assets/RecipeIcons/${Name}.png`)} className="recipe-icon"/>
                                    {Name}
                                </div>
                        ))}
                    </div>
                </div>
            }
            </div>
        );
    }
}

export default RecipeDropDownList;