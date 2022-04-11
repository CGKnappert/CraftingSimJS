import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './currentmacro.css';
import { removeMacroAction } from '../../context/index'

function CurrentMacro(props) {
    const macro = useSelector((state) => state.macro);
    const dispatch = useDispatch();

    const removeAction = (event) => {
        dispatch(removeMacroAction(event));
        props.simulatorUpdate();
    }

    return (
        <div className="crafting-sim-macro">
            <div className="crafting-sim-macro-header">
                <div className="crafting-sim-progress-header-left">
                    <h3>Macro in progress</h3>
                </div>
                <div className="crafting-sim-import-export">
                    {/* <button className='exportMacro' onClick={this.exportMacro}>Export</button>
                    <button className='importMacro' onClick={this.importMacro}>Import</button> */}
                </div>
            </div>
            <div className="crafting-sim-macro-actions">
                {macro
                    .map((Name, index, arr) => <img key={index} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => removeAction(index)} />)}
            </div>
        </div>
    )
}

export default CurrentMacro;