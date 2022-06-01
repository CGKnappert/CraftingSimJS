import React from 'react';
import { useSelector } from 'react-redux';
import './currentbuffs.css';

function CurrentBuffs(props) {
    const currBuffs = useSelector((state) => state.macroState.currBuffs);


    return (
        <div className="crafting-sim-buffs-active">
            <div className="crafting-sim-buffs-active-header">
                <h3>Current Buffs</h3>
            </div>
            {Object.keys(currBuffs).length > 0 &&
                <div className="crafting-sim-buffs-active-image">
                    {Object.entries(currBuffs)
                        .filter(([Name]) => (Name !== 'Observe' || Name !== 'Trained Eye'))
                        .map(([Name]) => <img key={Name} src={require(`../../assets/Buff Icons/${Name}${(Name === 'Inner Quiet') ? currBuffs['Inner Quiet'] : ''}.png`)} title={Name} alt={Name} />)}
                </div>
            }
        </div>
    )
}

export default CurrentBuffs;