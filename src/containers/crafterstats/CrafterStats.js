import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './crafterstats.css';
import { setCrafterCraftsmanship, setCrafterControl, setCrafterCP } from '../../context/index'


const CrafterStats = (props) => {
    const recipe = useSelector((state) => state.recipe);
    var Craftsmanship = useSelector((state) => state.Craftsmanship);
    var Control = useSelector((state) => state.Control);
    var CP = useSelector((state) => state.CP);
    console.log(recipe, Craftsmanship)
    const dispatch = useDispatch();

    const setCraftmanship = (event) => {
        dispatch(setCrafterCraftsmanship(event.target.value));
    }
    const setControl = (event) => {
        dispatch(setCrafterControl(event.target.value));
    }
    const setCP = (event) => {
        dispatch(setCrafterCP(event.target.value));
    }

    return (
        <div className='crafting-sim-stats-and-recipe'>
            <div className='crafting-sim-stats-container'>
                <div className='crafting-sim-crafter-stats-title'><h3>Crafter Stats:</h3></div>
                <div className='crafting-sim-crafter-stats'>
                    <div className='crafting-sim-crafter-stats-craftsmanship'>
                        <label htmlFor="craftsmanship">Craftsmanship: </label>
                        <input type="number" className='crafting-sim-crafter-craftsmanship' id="craftsmanship" value={Craftsmanship} min="1" max="5000" onChange={setCraftmanship} />
                    </div>
                    <div className='crafting-sim-crafter-stats-control'>
                        <label htmlFor="control">Control: </label>
                        <input type="number" className='crafting-sim-crafter-control' id="control" value={Control} min="1" max="5000" onChange={setControl} />
                    </div>
                    <div className='crafting-sim-crafter-stats-CP'>
                        <label htmlFor="CP">CP: </label>
                        <input type="number" className='crafting-sim-crafter-CP' id="CP" value={CP} min="1" max="2000" onChange={setCP} />
                    </div>
                </div>
            </div>
            <div className='crafting-sim-recipe-container'>
                <div className='crafting-sim-recipe-title'>
                    <h3> {'Recipe: ' + ((recipe !== "" && typeof recipe === 'string') ? recipe : "None")} </h3>
                </div>
                <div className='crafting-sim-recipe-icon'>
                    <img className='crafting-sim-recipe-icon-img' id="recipeImg" style={{display: (recipe !== "" && typeof recipe === 'string') ? "" : "none"}} src={(recipe !== "" && typeof recipe === 'string') ? require(`../../assets/RecipeIcons/${recipe}.png`) : ""} />
                </div>
            </div>
        </div>
    )
}


export default CrafterStats;