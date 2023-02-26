import React from 'react';
import './sidebar.css';
import { useState, useEffect } from "react";
import SideBarCom from './SideBarCom';

function Sidebar({ projects, handleDelete, handleAdd, handleSet }) {
    const [components, setComponents] = useState({});
    const [editFlag, setEditFlag] = useState(false);
    const [inputString, setInputString] = useState('');

    useEffect(() => {
        setComponents(projects);
    }, [projects]);

    function addNewComponent() {
        setEditFlag(true);
    }

    function handleKeyDown(key) {
        if (key === 'Enter' && editFlag) {
            setEditFlag(false);
            handleAdd(inputString);
        }
    }

    function handleClick(project_id) {
        console.log(project_id);
        handleSet(project_id);
    }

    return <div className='sidebar'>
        <button onClick={addNewComponent} className="add-button">+</button>
        {
            editFlag ? <input className='abc' type='text'
                onChange={(e) => setInputString(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e.key)}
            /> : <></>
        }
        {Object.keys(components).length ? Object.entries(components).map((component, index) => (
            <SideBarCom key={index} component={component[0]} handleClick={handleClick} onDelete={() => handleDelete(component[0])} />
        )) : <></>}
    </div>
}

export default Sidebar;
