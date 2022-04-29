import React from 'react';
import './currentbuffs.css';

function CurrentBuffs(props) {
    return (
        <div className="crafting-sim-buffs-active">
            <div className="crafting-sim-buffs-active-header">
                <h3>Current Buffs</h3>
            </div>
            {Object.keys(props.currBuffs).length > 0 &&
                <div className="crafting-sim-buffs-active-image">
                    {Object.entries(props.currBuffs)
                        .filter(([Name]) => (Name !== 'Observe' || Name !== 'Trained Eye'))
                        .map(([Name]) => <img key={Name} src={require(`../../assets/Buff Icons/${Name}${(Name === 'Inner Quiet') ? props.currBuffs['Inner Quiet'] : ''}.png`)} title={Name} alt={Name} />)}
                </div>
            }
        </div>
    )
}

export default CurrentBuffs;