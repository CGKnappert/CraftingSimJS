import React, { useState } from "react";
import './macrotooltip.css';

export const MacroTooltip = ({ Skill, CP, Durability, Quality, QualityDelta, Progress, ProgressDelta, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    function markup(desc) {
        // console.log(desc.replace(/\n/, '<br>'));
        return {__html:desc.replace(/\n/, '<br>')};
    }
    return (
        <div className="macro-tooltip-container"
        onMouseEnter={() => {
            setIsVisible(true); 
            console.log(CP);
            }}
        onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && <div className="macro-tooltip-inner">
                <div className="macro-tooltip-skill">{Skill}</div>
                <div className="macro-tooltip-left">
                    <div className="macro-tooltip-progress">Progress: </div>
                    <div className="macro-tooltip-quality">Quality: </div>
                    <div className="macro-tooltip-durability">Durability: </div>
                    <div className="macro-tooltip-CP">CP:</div>
                </div>
                <div className="macro-tooltip-right">
                    <div className="macro-tooltip-progress">{Progress} ({ProgressDelta})</div>
                    <div className="macro-tooltip-quality">{Quality} ({QualityDelta})</div>
                    <div className="macro-tooltip-durability">{Durability}</div>
                    <div className="macro-tooltip-CP">{CP}</div>
                </div>
            </div>
            }
        </div>
    )
};