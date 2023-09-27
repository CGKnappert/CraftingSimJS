import React, { Component } from 'react';
import './currentmacro.css';
import { removeMacroAction, setMacro } from '../../context/index'
import { connect } from 'react-redux';
const debug = 1;

class CurrentMacro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showExport: false,
            showImport: false,
            macroString: ""
        }
    }

    removeAction = (event) => {
        this.props.removeMacroAction(event);
    }

    closeOverlay = () => {
        this.setState({ showImport: false });
        this.setState({ showExport: false });
        console.log("close");
        this.forceUpdate();
    }


    arrayToMacro = (array) => {
        let jsonString = require('../../JSON/CraftAction.json');

        let macroStringTemp = "";
        for (let step of array) {
            for (let action of jsonString) {
                if (action["Name"] === step) {
                    if ((action["ActionCategory"] !== undefined && action["ActionCategory"] !== null)) {
                        macroStringTemp += `/ac ${step} <wait.2>\n`;
                    }
                    else {
                        macroStringTemp += `/ac "${step}" <wait.3>\n`;
                    }
                }
            }
        }
        return macroStringTemp
    }


    openExportOverlay = () => {
        this.setState({ showExport: true });
        console.log(this.props.macro)
        console.log(this.arrayToMacro(this.props.macro))
        this.setState({macroString: this.arrayToMacro(this.props.macro)})
    }


    importMacro = () => {
        let importMacro = document.getElementById("importedMacro");
        this.setState({ showImport: false });

        // TODO: Cleanse macro before setting
        let tempMacro = importMacro.value.replaceAll(/\/echo[^\n]+/g, '').replaceAll(/"*[\t\r\v\f ]*<[^>]+>[\t\r\v\f ]*/g, '').replaceAll(/\/ac\s+/g, '').replaceAll(/"\s*/g, '').split(/[\r\n]+/).filter((val) => val !== "");
        if (debug) console.log("Imported Macro: " + tempMacro)
        this.props.setMacro(tempMacro);
        this.forceUpdate();
    }

    openImportOverlay = () => {
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
                        <div className="export-overlay" onClick={this.closeOverlay} >
                        </div>
                        <div className='export-overlay-window'>
                            <textarea className='export-overlay-macro' id="exportedMacro" cols="15" type="string" value={this.state.macroString} readOnly={true} />
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