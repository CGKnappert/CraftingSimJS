import React, { Component } from 'react';
import './currentmacro.css';
import { removeMacroAction, setMacro } from '../../context/index'
import { connect } from 'react-redux';

class CurrentMacro extends Component {

    constructor(props) {
        super(props);
        const macroString = "";
        this.state = {
            showExport: false,
            showImport: false
        }
    }
    // const macro = useSelector((state) => state.macro);
    // const dispatch = useDispatch();

    removeAction = (event) => {
        this.props.removeMacroAction(event);
    }

    closeOverlay = () => {
        this.state.showImport = false;
        this.state.showExport = false;
        console.log("close");
        this.forceUpdate();
    }


    openExportOverlay = () => {
        let jsonString = require('../../JSON/CraftAction.json');

        let macroStringTemp = "";
        for (let step of this.props.macro) {
            for (let action of jsonString) {
                if (action["Name"] === step) {
                    if ((action["ActionCategory"] !== undefined && action["ActionCategory"] !== null)) {
                        macroStringTemp += ("/ac " + step + " <wait.2>" + "\n");
                    }
                    else {
                        macroStringTemp += ("/ac " + step + " <wait.3>" + "\n")
                    }
                }
            }
        }
        this.macroString = macroStringTemp;

        this.setState({ showExport: true })
    }


    importMacro = () => {
        let importMacro = document.getElementById("importedMacro");
        this.setState({ showImport: false });
        this.props.setMacro(importMacro.value.replaceAll(/\/echo[^\n]+/g, '').replaceAll(/"*[\t\r\v\f ]*<[^>]+>[\t\r\v\f ]*/g, '').replaceAll(/\/ac\s+/g, '').replaceAll(/"\s*/g, '').split(/[\r\n]+/).filter((val) => val !== ""));
        this.forceUpdate();
    }

    openImportOverlay = (value) => {
        this.setState({ showImport: true });
    }

    render() {

        return (
            <div className="crafting-sim-macro" >
                {
                    this.state.showImport &&
                    <div className="import-overlay-container">
                        <div className="import-overlay" onClick={this.closeOverlay} >
                        </div>
                        <div className='import-overlay-window'>
                            <textarea className='import-overlay-macro' id="importedMacro" cols="15" type="string" />
                            <button className='importMacroButton' onClick={this.importMacro}>Import Macro</button>
                        </div>
                    </div>
                }

                {this.state.showExport &&
                    <div className="export-overlay-container">
                        <div className="export-overlay" onClick={this.closeOverlay}  >
                        </div>
                        <div className='export-overlay-window'>
                            <textarea className='export-overlay-macro' id="exportedMacro" cols="15" type="string" value={this.macroString} readOnly={true} />
                            <button className='closeExportMacroButton' onClick={this.closeOverlay}>Close Window</button>
                        </div>
                    </div>
                }

                <div className="crafting-sim-macro-header">
                    <div className="crafting-sim-macro-header-left">
                        <h3>Macro in progress</h3>
                    </div>
                    <div className="crafting-sim-import-export">
                        <button className='exportMacro' onClick={this.openExportOverlay}>Export</button>
                        <button className='importMacro' onClick={this.openImportOverlay}>Import</button>
                    </div>
                </div>
                <div className="crafting-sim-macro-actions">
                    {this.props.macro !== undefined &&
                        this.props.macro
                            .map((Name, index, arr) => <img key={index} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.removeAction(index)} />)}
                </div>
            </div >
        )
    }
}

const mapStateToFunction = state => {
    return {
        macro: state.macro
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeMacroAction: (event) => dispatch(removeMacroAction(event)),
        setMacro: (event) => dispatch(setMacro(event))
    }
}

export default connect(mapStateToFunction, mapDispatchToProps)(CurrentMacro);