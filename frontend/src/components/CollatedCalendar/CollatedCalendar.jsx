import React, { useState, useEffect } from 'react';
import './collatedCalendar.css';


function CollatedCalendar() {
    const [calendar, setCalendar] = useState();
    const userIds = ['63fa537f5f0e6abd3e1c06ea'];
    const startTime = 32;
    const endTime = 84;
    const today = (new Date()).getTime();
    const API_URL = 'https://syed0059-stunning-space-train-rxw5q956qrghwwjv.github.dev/';
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

    useEffect(() => {
        if (!userIds.length) return;

        const updateCalender = async () => {
            let newCalendar = null;
            let i, j;
            for (const userId of userIds) {
                const response = await fetch("https://intuition.onrender.com/getSchedule/?id=63fa537f5f0e6abd3e1c06ea/");
                const json = await response.json();
                console.log(json);
                if (!newCalendar) newCalendar = json;
                else {
                    for (i = 0; i < json.length; i++) {
                        newCalendar[i] += json[i];
                    }
                }

            }

            for (i = 0; i < 7; i++) {
                for (j = 0; j < 4; j++) {
                    calendar[i][j] = newCalendar[i * 7 + j];
                }
            }
            setCalendar(calendar);
        }
        updateCalender();

    }, [userIds]);

    return (
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
                                <td style={{ background: `rgba(0, ${255 * value[0] / userIds.length}, 0)` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                                <td style={{ background: `rgba(0, ${255 * value[1] / userIds.length}, 0)` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                                <td style={{ background: `rgba(0, ${255 * value[2] / userIds.length}, 0)` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                                <td style={{ background: `rgba(0, ${255 * value[3] / userIds.length}, 0)` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                                <td style={{ background: `rgba(0, ${255 * value[4] / userIds.length}, 0)` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                                <td style={{ background: `rgba(0, ${255 * value[5] / userIds.length}, 0)` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                                <td style={{ background: `rgba(0, ${255 * value[6] / userIds.length}, 0)` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                            </tr>
                            : <></>
                    }) : <></>
                }
            </tbody>
        </table>
    );
}

export default CollatedCalendar;