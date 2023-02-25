import React, { useState, useEffect } from 'react';
import './calendar.css';

function Calendar() {
    const [calendar, setCalendar] = useState();
    const [startTime, setStartTime] = useState(8 * 60);
    const [endTime, setEndTime] = useState(23 * 60 + 30);
    const [mouseState, setMouseState] = useState(false);
    const today = (new Date()).getTime();
    let mouseDown = false;

    function filterByTime(entry) {
        return entry[1][0] >= startTime && entry[1][0] <= endTime;
    }
    useEffect(() => {
        const calendarObj = {};
        for (let hour = 0; hour <= 23; hour += 1) {
            for (let minute = 0; minute < 60; minute += 15) {
                calendarObj[('0' + hour).substr(-2) + ':' + ('0' + minute).substr(-2)] = [hour * 60 + minute, 0, 0, 0, 0, 0, 1, 0];
            }
        }
        setCalendar(calendarObj);
        console.log('reload');
    }, []);

    function toggleAvail(e, key, idx) {
        if (e.type === 'mousedown') setMouseState(true);

        if (e.type !== 'mousedown' && !mouseState) return;

        const cloneCalendar = structuredClone(calendar);
        cloneCalendar[key][idx] = (calendar[key][idx] + 1) % 2;

        setCalendar(cloneCalendar);
    }

    function getCellStyle(minutes, available) {
        let classStr = 'calendar-cell';

        if (minutes % 60 === 0) classStr += ' calendar-cell-hour';
        classStr += (available) ? ' calendar-cell-green' : '';

        return classStr;
    }

    return (
        <main className='calendar-wrapper'>
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
                        Object.entries(calendar).filter(filterByTime).map((value) => (
                            <tr className='calendar-row' key={value[0]}>
                                {value[1][0] % 60 === 0 ? (
                                    <td rowSpan='4' className='calendar-cell calendar-cell-timing'>{(value[1][0] % 60) === 0 ? value[0] : ''}</td>
                                ) : (<></>)
                                }
                                <td onMouseDown={(e) => toggleAvail(e, value[0], 1)}
                                    onMouseOver={(e) => toggleAvail(e, value[0], 1)}
                                    onMouseUp={() => { setMouseState(false); }}
                                    className={getCellStyle(value[1][0], value[1][1])}></td>
                                <td onMouseDown={(e) => toggleAvail(e, value[0], 2)}
                                    onMouseOver={(e) => toggleAvail(e, value[0], 2)}
                                    onMouseUp={() => { setMouseState(false); }}
                                    className={getCellStyle(value[1][0], value[1][2])}></td>
                                <td onMouseDown={(e) => toggleAvail(e, value[0], 3)}
                                    onMouseOver={(e) => toggleAvail(e, value[0], 3)}
                                    onMouseUp={() => { setMouseState(false); }}
                                    className={getCellStyle(value[1][0], value[1][3])}></td>
                                <td onMouseDown={(e) => toggleAvail(e, value[0], 4)}
                                    onMouseOver={(e) => toggleAvail(e, value[0], 4)}
                                    onMouseUp={() => { setMouseState(false); }} className={getCellStyle(value[1][0], value[1][4])}></td>
                                <td onMouseDown={(e) => toggleAvail(e, value[0], 5)}
                                    onMouseOver={(e) => toggleAvail(e, value[0], 5)}
                                    onMouseUp={() => { setMouseState(false); }}
                                    className={getCellStyle(value[1][0], value[1][5])}></td>
                                <td onMouseDown={(e) => toggleAvail(e, value[0], 6)}
                                    onMouseOver={(e) => toggleAvail(e, value[0], 6)}
                                    onMouseUp={() => { setMouseState(false); }}
                                    className={getCellStyle(value[1][0], value[1][6])}></td>
                                <td onMouseDown={(e) => toggleAvail(e, value[0], 7)}
                                    onMouseOver={(e) => toggleAvail(e, value[0], 7)}
                                    onMouseUp={() => { setMouseState(false); }}
                                    className={getCellStyle(value[1][0], value[1][7])}></td>
                            </tr>
                        )) : (<></>)}
                </tbody>
            </table>
        </main >
    );
}

export default Calendar;
