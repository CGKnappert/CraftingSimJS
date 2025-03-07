import React from 'react';
import { useDispatch } from 'react-redux';
import './crafteractions.css';
import { addMacroAction } from '../../context/index';
import { ActionTooltip } from '../../classes/ActionTooltip';
const debug = 0;


function CrafterActions(props) {
  const craftActions = require('../../JSON/CraftAction.json');

  // const recipe = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  const addAction = (event) => {
    if (debug) console.log(event)
    dispatch(addMacroAction(event));
  }

  function orderingFunction(a, b) {
    // console.log(a, b)
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
        <div className='crafting-sim-actions-title'><h3>Crafter Actions</h3></div>

        <div className="crafting-sim-synthesis">
          <h3>Synthesis Actions</h3>
          <div className="crafting-sim-synthesis-actions">
            {craftActions
              .sort(orderingFunction)
              .filter(({ Description }) => Description.search('progress') !== -1)
              .map(({ Name, Cost, Description }) => 
                <ActionTooltip className='crafting-sim-action-tooltip' Skill={Name} Description={Description}>
                  <img key={Name} data={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => addAction(Name)} />
                </ActionTooltip>
                )}
          </div>
        </div>

        <div className="crafting-sim-quality">
          <h3>Quality Actions</h3>
          <div className="crafting-sim-quality-actions">
            {craftActions
              .sort(orderingFunction)
              .filter(({ Description }) => Description.search('quality') !== -1)
              .map(({ Name, Cost, Description }) => 
                <ActionTooltip className='crafting-sim-action-tooltip' Skill={Name} Description={Description}>
                  <img className='crafting-sim-action-img' key={Name}  src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => addAction(Name)} />
                </ActionTooltip>
              )}
          </div>
        </div>

        <div className="crafting-sim-buffs">
          <h3>Buff Actions</h3>
          <div className="crafting-sim-buffs-actions">
            {craftActions
              .sort(orderingFunction)
              .filter(({ Description }) => (Description.search('progress') === -1 && Description.search('quality') === -1))
              .map(({ Name, Cost, Description }) => 
              <ActionTooltip className='crafting-sim-action-tooltip' Skill={Name} CP={Cost} Description={Description}>
                <img key={Name}  src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => addAction(Name)} />
              </ActionTooltip>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default CrafterActions;