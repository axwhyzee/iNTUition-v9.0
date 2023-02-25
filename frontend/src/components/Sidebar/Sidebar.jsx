import React from 'react';
import './sidebar.css';
import { useState } from "react";
import SideBarCom from './SideBarCom';

function Sidebar() {
    const [components, setComponents] = useState([]);

    function addNewComponent() {
        <input type="text"></input>
        const newComponent = (
            <SideBarCom></SideBarCom>
        );

        setComponents([...components, newComponent]);
    }

    return <div className='sidebar'>
        <button onClick={addNewComponent} className="add-button">+</button>
        {components.map((component, index) => (
            <div key={index}>{component}</div>
        ))}
    </div>
}

export default Sidebar;