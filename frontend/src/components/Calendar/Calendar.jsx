import React, { useState, useEffect } from 'react';
import './calendar.css';

function Calendar() {
    const [calendar, setCalendar] = useState();
    const [startTime, setStartTime] = useState(8 * 60);
    const [endTime, setEndTime] = useState(23 * 60 + 30);
    const today = (new Date()).getTime();

    function filterByTime(entry) {
        return entry[1][0] >= startTime && entry[1][0] <= endTime;
    }
    useEffect(() => {
        const calendarObj = {};
        for (let hour = 0; hour <= 23; hour += 1) {
            for (let minute = 0; minute < 60; minute += 15) {
                calendarObj[('0' + hour).substr(-2) + ':' + ('0' + minute).substr(-2)] = [hour * 60 + minute, [1], [], [], [], [], [], []];
            }
        }
        setCalendar(calendarObj);
    }, []);

    function getCellStyle(minutes, tasks) {
        let classStr = 'calendar-cell';

        if (minutes % 60 == 0) classStr += ' calendar-cell-hour';
        classStr += (tasks) ? ' calendar-cell-red' : ' calendar-cell-green';

        return classStr;
    }

    return (
        <main className='calendar-wrapper'>
            <table className='calendar'>
                <tbody>
                    <tr>
                        <th></th>
                        <th className='calendar-header'>{new Date(today).toLocaleDateString()}</th>
                        <th className='calendar-header'>{new Date(today + 24 * 60 * 60 * 100).toLocaleDateString()}</th>
                        <th className='calendar-header'>{new Date(today + 2 * (24 * 60 * 60 * 100)).toLocaleDateString()}</th>
                        <th className='calendar-header'>{new Date(today + 3 * (24 * 60 * 60 * 100)).toLocaleDateString()}</th>
                        <th className='calendar-header'>{new Date(today + 4 * (24 * 60 * 60 * 100)).toLocaleDateString()}</th>
                        <th className='calendar-header'>{new Date(today + 5 * (24 * 60 * 60 * 100)).toLocaleDateString()}</th>
                        <th className='calendar-header'>{new Date(today + 6 * (24 * 60 * 60 * 100)).toLocaleDateString()}</th>
                    </tr>
                    {calendar ?
                        Object.entries(calendar).filter(filterByTime).map((value, idx) => (
                            <tr className='calendar-row' key={idx}>
                                {value[1][0] % 60 == 0 ? (
                                    <td rowSpan='4' className='calendar-cell calendar-cell-timing'>{(value[1][0] % 60) == 0 ? value[0] : ''}</td>
                                ) : (<></>)
                                }
                                <td className={getCellStyle(value[1][0], value[1][1].length)}></td>
                                <td className={getCellStyle(value[1][0], value[1][2].length)}></td>
                                <td className={getCellStyle(value[1][0], value[1][3].length)}></td>
                                <td className={getCellStyle(value[1][0], value[1][4].length)}></td>
                                <td className={getCellStyle(value[1][0], value[1][5].length)}></td>
                                <td className={getCellStyle(value[1][0], value[1][6].length)}></td>
                                <td className={getCellStyle(value[1][0], value[1][7].length)}></td>
                            </tr>
                        )) : (<></>)}
                </tbody>
            </table>
        </main>
    );
}

export default Calendar;
