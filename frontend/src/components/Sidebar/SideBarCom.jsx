import React from 'react';
import './SideBarCom.css';

function SideBarCom({ component, handleClick }) {
    return (
        <div className='sidebar-com' onClick={() => handleClick(component)}>{component}</div>
    );
}

export default SideBarCom;
