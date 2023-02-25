import React from 'react';
import './sidebar.css';
import { useState } from "react";
import SideBarCom from './SideBarCom';

function Sidebar() {
    const [components, setComponents] = useState([]);

    function handleDelete(i) {
        setComponents((currComps) => {
            let temp = currComps.slice();
            temp.splice(0,1);
            return temp;
        })
    }
    function addNewComponent() {
        <input type="text"></input>
        const newComponent = (
            <SideBarCom onDelete={handleDelete}></SideBarCom>
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
