import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './crafteractions.css';
import { addMacroAction } from '../../context/index'


function CrafterActions(props) {
  const craftActions = require('../../JSON/CraftAction.json');

  const recipe = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  const addAction = (event) => {
    console.log(event)
    dispatch(addMacroAction(event));
    props.simulatorUpdate();
  }

  function orderingFunction(a, b) {
    console.log(a, b)
    // if (b.Specialist === 1) {
    //   //put a before b
    //   return -1;
    // }
    // if (a.Specialist !== 1) {
    //   //put a before b
    //   return 1;
    // }
    if (a.Cost < b.Cost) {
      //put a before b
      return -1;
    }
    if (a.Cost > b.Cost) {
      //put b before a
      return 1;
    }
  }

  return (
    <div className='crafting-sim-container'>
      <div className="crafting-sim-actions">

        <div className="crafting-sim-synthesis">
          <h3>Synthesis Actions</h3>
          <div className="crafting-sim-synthesis-actions">
            {craftActions
              .sort(orderingFunction)
              .filter(({ Description }) => Description.search('progress') !== -1)
              .map(({ Name }) => <img key={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => addAction(Name)} />)}
          </div>
        </div>

        <div className="crafting-sim-quality">
          <h3>Quality Actions</h3>
          <div className="crafting-sim-quality-actions">
            {craftActions
              .sort(orderingFunction)
              .filter(({ Description }) => Description.search('quality') !== -1)
              .map(({ Name }) => <img key={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => addAction(Name)} />)}
          </div>
        </div>

        <div className="crafting-sim-buffs">
          <h3>Buff Actions</h3>
          <div className="crafting-sim-buffs-actions">
            {craftActions
              .sort(orderingFunction)
              .filter(({ Description }) => (Description.search('progress') === -1 && Description.search('quality') === -1))
              .map(({ Name }) => <img key={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => addAction(Name)} />)}
          </div>

        </div>
      </div>
    </div>
  )
}

export default CrafterActions;