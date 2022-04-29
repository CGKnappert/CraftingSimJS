import React from 'react';
import './classselector.css';

function ClassSelector(props) {
  return (
    <div className='stickysim__header_container'>
      <div className='stickysim__header-content__searches'>
        <div className='stickysim__craft-classes'>
          {props.classImages.map(({ id, title, state }) => <img key={id} src={require(`../../assets/Classes/${title}.png`)} title={title} alt={title} className={state === true ? 'craft-classes-selected' : 'craft-classes-unselected'} onClick={() => props.setToggleClass(id)} />)}
        </div>
      </div>
    </div>
  )
};

export default ClassSelector;