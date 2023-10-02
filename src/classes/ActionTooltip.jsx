import React, { useState } from "react";
import './actiontooltip.css';

export const ActionTooltip = ({ Skill, Description, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    function markup(desc) {
        console.log(desc.replace(/\n/, '<br>'))
        return {__html:desc.replace(/\n/, '<br>')}
    }
    return (
        <div className="action-tooltip-container"
        onMouseEnter={() => {
            setIsVisible(true); 
            }}
        onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && <div className="action-tooltip-inner">
                <div className="action-tooltip-skill">{Skill}</div>
                <div className="action-tooltip-description" dangerouslySetInnerHTML={markup(Description)}/>
            </div>
            }
        </div>
    )
};