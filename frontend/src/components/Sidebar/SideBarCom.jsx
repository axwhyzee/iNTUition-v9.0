import React from 'react';
import './SideBarCom.css';
import { useState } from 'react';

function SideBarCom(props) {
    const [inputValue, setInputValue] = useState('');
    const [button, setButton] = useState(null);
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            const button = (
                <button className="proj-com" onClick={() => console.log(inputValue)}>
                    {inputValue}
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
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
            )}
        </div>
    );
}

export default SideBarCom;
