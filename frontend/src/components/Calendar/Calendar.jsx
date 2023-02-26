import React, { useState, useEffect } from 'react';
import './calendar.css';

function Calendar() {
    const [calendar, setCalendar] = useState();
    const [startTime, setStartTime] = useState(8 * 4); // 08:00
    const [endTime, setEndTime] = useState(23 * 4 + 2); // 23:30
    const [toggleStart, setToggleStart] = useState([0, 0, 0, false]);
    const today = (new Date()).getTime();
    const userId = '63fa537f5f0e6abd3e1c06ea';
    const days = 7;
    const timings = [
        '00:00', '00:15', '00:30', '00:45',
        '01:00', '01:15', '01:30', '01:45',
        '02:00', '02:15', '02:30', '02:45',
        '03:00', '03:15', '03:30', '03:45',
        '04:00', '04:15', '04:30', '04:45',
        '05:00', '05:15', '05:30', '05:45',
        '06:00', '06:15', '06:30', '06:45',
        '07:00', '07:15', '07:30', '07:45',
        '08:00', '08:15', '08:30', '08:45',
        '09:00', '09:15', '09:30', '09:45',
        '10:00', '10:15', '10:30', '10:45',
        '11:00', '11:15', '11:30', '11:45',
        '12:00', '12:15', '12:30', '12:45',
        '13:00', '13:15', '13:30', '13:45',
        '14:00', '14:15', '14:30', '14:45',
        '15:00', '15:15', '15:30', '15:45',
        '16:00', '16:15', '16:30', '16:45',
        '17:00', '17:15', '17:30', '17:45',
        '18:00', '18:15', '18:30', '18:45',
        '19:00', '19:15', '19:30', '19:45',
        '20:00', '20:15', '20:30', '20:45',
        '21:00', '21:15', '21:30', '21:45',
        '22:00', '22:15', '22:30', '22:45',
        '23:00', '23:15', '23:30', '23:45'
    ]
    const API_URL = 'https://intuition.onrender.com/';


    useEffect(() => {
        const initCalendar = async () => {
            //const response = await fetch(API_URL + 'getSchedule/?id=' + userId);
            //const json = (await response.json())['schedule']['schedule'];
            //            console.log(json);
            const json = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0];
            const tempCalendar = [];

            let i = 0;
            while (i < json.length) {
                const row = [];
                for (let j = 0; j < 7; j++) {
                    row.push(json[i]);
                    i++;
                }
                tempCalendar.push(row);

            }
            console.log(tempCalendar);
            setCalendar(tempCalendar);
        };
        initCalendar();

    }, []);

    async function saveCalendar() {
        /*
        const temp = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        console.log(temp.flat());
        const response = await fetch(API_URL + '/updateSchedule', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                'userId': '63fa537f5f0e6abd3e1c06ea',
                'schedule': temp.flat()
            },
        });
        console.log(response);*/
        console.log(calendar.flat());
    }

    function startToggle(row, col) {
        setToggleStart([row, col, calendar[row][col], true]);
    }

    function endToggle(row, col, newFlagState) {
        if (toggleStart[3]) {
            const colSt = Math.min(toggleStart[1], col);
            const colEnd = Math.max(toggleStart[1], col);
            const target = (toggleStart[2] + 1) % 2;
            const calendarClone = structuredClone(calendar);

            for (let rowIdx = Math.min(toggleStart[0], row); rowIdx <= Math.max(toggleStart[0], row); rowIdx++) {
                for (let colIdx = colSt; colIdx <= colEnd; colIdx++) {
                    calendarClone[rowIdx][colIdx] = target;
                }
            }
            setCalendar(calendarClone);

            if (!newFlagState) setToggleStart([0, 0, 0, false]);
        }
    }


    return (
        <main className='calendar-wrapper'>
            <button className='save-calendar' onClick={saveCalendar}>SAVE</button>
            <table className='calendar'>
                <tbody>
                    <tr>
                        <th></th>
                        <th className='calendar-header'>{new Date(today).toLocaleDateString()}</th>
                        <th className='calendar-header'>{new Date(today + 24 * 60 * 60 * 1000).toLocaleDateString()}</th>
                        <th className='calendar-header'>{new Date(today + 2 * (24 * 60 * 60 * 1000)).toLocaleDateString()}</th>
                        <th className='calendar-header'>{new Date(today + 3 * (24 * 60 * 60 * 1000)).toLocaleDateString()}</th>
                        <th className='calendar-header'>{new Date(today + 4 * (24 * 60 * 60 * 1000)).toLocaleDateString()}</th>
                        <th className='calendar-header'>{new Date(today + 5 * (24 * 60 * 60 * 1000)).toLocaleDateString()}</th>
                        <th className='calendar-header'>{new Date(today + 6 * (24 * 60 * 60 * 1000)).toLocaleDateString()}</th>
                    </tr>
                    {calendar ?
                        calendar.map((value, idx) => {
                            return (idx >= startTime && idx <= endTime) ?
                                <tr className='calendar-row' key={idx}>
                                    {
                                        idx % 4 === 0 ? (
                                            <td rowSpan='4' className='calendar-cell calendar-cell-timing'>{timings[idx]}</td>
                                        ) : (<></>)
                                    }
                                    <td className={'calendar-cell calendar-cell-hover' + (value[0] == 0 ? ' calendar-cell-green' : '') + (idx % 4 == 0 ? ' calendar-cell-hour' : '')} onMouseUp={() => { endToggle(idx, 0, false) }} onMouseOver={() => { endToggle(idx, 0, true) }} onMouseDown={() => { startToggle(idx, 0) }}></td>
                                    <td className={'calendar-cell calendar-cell-hover' + (value[1] == 0 ? ' calendar-cell-green' : '') + (idx % 4 == 0 ? ' calendar-cell-hour' : '')} onMouseUp={() => { endToggle(idx, 1, false) }} onMouseOver={() => { endToggle(idx, 1, true) }} onMouseDown={() => { startToggle(idx, 1) }}></td>
                                    <td className={'calendar-cell calendar-cell-hover' + (value[2] == 0 ? ' calendar-cell-green' : '') + (idx % 4 == 0 ? ' calendar-cell-hour' : '')} onMouseUp={() => { endToggle(idx, 2, false) }} onMouseOver={() => { endToggle(idx, 2, true) }} onMouseDown={() => { startToggle(idx, 2) }}></td>
                                    <td className={'calendar-cell calendar-cell-hover' + (value[3] == 0 ? ' calendar-cell-green' : '') + (idx % 4 == 0 ? ' calendar-cell-hour' : '')} onMouseUp={() => { endToggle(idx, 3, false) }} onMouseOver={() => { endToggle(idx, 3, true) }} onMouseDown={() => { startToggle(idx, 3) }}></td>
                                    <td className={'calendar-cell calendar-cell-hover' + (value[4] == 0 ? ' calendar-cell-green' : '') + (idx % 4 == 0 ? ' calendar-cell-hour' : '')} onMouseUp={() => { endToggle(idx, 4, false) }} onMouseOver={() => { endToggle(idx, 4, true) }} onMouseDown={() => { startToggle(idx, 4) }}></td>
                                    <td className={'calendar-cell calendar-cell-hover' + (value[5] == 0 ? ' calendar-cell-green' : '') + (idx % 4 == 0 ? ' calendar-cell-hour' : '')} onMouseUp={() => { endToggle(idx, 5, false) }} onMouseOver={() => { endToggle(idx, 5, true) }} onMouseDown={() => { startToggle(idx, 5) }}></td>
                                    <td className={'calendar-cell calendar-cell-hover' + (value[6] == 0 ? ' calendar-cell-green' : '') + (idx % 4 == 0 ? ' calendar-cell-hour' : '')} onMouseUp={() => { endToggle(idx, 6, false) }} onMouseOver={() => { endToggle(idx, 6, true) }} onMouseDown={() => { startToggle(idx, 6) }}></td>
                                </tr>
                                : <></>
                        }) : <></>
                    }
                </tbody>
            </table>
        </main >
    );
}

export default Calendar;
