import React from 'react';
import './SideBarCom.css';
import { useState } from 'react';

function SideBarCom(props) {
    const [inputValue, setInputValue] = useState('');
    const [button, setButton] = useState(null);
    const deletehandler = () => {
        props.onDelete(0);
    }
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            const button = (
                <button className="proj-com">
                    {inputValue}
                    <span className="delete-button" onClick={deletehandler}>x</span>
                </button>
            );
            setInputValue('');
            setButton(button);
        }
    }
    return (
        <div>
            {button || (
                <input
                    type="text"
                    className='input'
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
            )}
        </div>
    );
}

export default SideBarCom;
