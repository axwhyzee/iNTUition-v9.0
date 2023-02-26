import React, { useState, useEffect } from 'react';
import './collatedCalendar.css';


function CollatedCalendar() {
    const [calendar, setCalendar] = useState();
    const userIds = ['63fa537f5f0e6abd3e1c06ea', '', '', '', ''];
    const startTime = 32;
    const endTime = 84;
    const today = (new Date()).getTime();
    const API_URL = 'https://intuition.onrender.com/';
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
    const dateStrOptions = { day: 'numeric', month: 'numeric' };
    useEffect(() => {
        if (!userIds.length) return;

        const updateCalender = async () => {
            let temp = [];
            let i, j;
            for (const userId of userIds) {
                const response = await fetch(API_URL + 'getSchedule?id=' + userId);
                //const json = (await response.json())['schedule']['schedule'];
                const json = Array(96 * 7).fill(0);

                if (temp.length == 0) temp = json;
                else {
                    for (i = 0; i < json.length; i++) {
                        temp[i] += json[i];
                    }
                }
            }

            const newCalendar = []
            for (i = 0; i < 24 * 4; i++) {
                const row = [];
                for (j = 0; j < 7; j++) {
                    row.push(newCalendar[i * 7 + j]);
                }
                newCalendar.push(row);
            }
            setCalendar(newCalendar);
        }
        updateCalender();

    }, []);

    return (
        <table className='collated-calendar'>
            <tbody>
                <tr>
                    <th></th>
                    <th className='calendar-header'>{new Date(today).toLocaleDateString('en-gb', dateStrOptions)}</th>
                    <th className='calendar-header'>{new Date(today + 24 * 60 * 60 * 1000).toLocaleDateString('en-gb', dateStrOptions)}</th>
                    <th className='calendar-header'>{new Date(today + 2 * (24 * 60 * 60 * 1000)).toLocaleDateString('en-gb', dateStrOptions)}</th>
                    <th className='calendar-header'>{new Date(today + 3 * (24 * 60 * 60 * 1000)).toLocaleDateString('en-gb', dateStrOptions)}</th>
                    <th className='calendar-header'>{new Date(today + 4 * (24 * 60 * 60 * 1000)).toLocaleDateString('en-gb', dateStrOptions)}</th>
                    <th className='calendar-header'>{new Date(today + 5 * (24 * 60 * 60 * 1000)).toLocaleDateString('en-gb', dateStrOptions)}</th>
                    <th className='calendar-header'>{new Date(today + 6 * (24 * 60 * 60 * 1000)).toLocaleDateString('en-gb', dateStrOptions)}</th>
                </tr>
                {calendar ?
                    calendar.map((value, idx) => {
                        return (idx >= startTime && idx < endTime) ?
                            <tr className='calendar-row' key={idx}>
                                {
                                    idx % 4 === 0 ? (
                                        <td rowSpan='4' className='calendar-cell calendar-cell-timing'>{timings[idx]}</td>
                                    ) : (<></>)
                                }
                                <td style={{ background: `rgba(50, 100, 50, ${0.7 * value[0] / userIds.length})` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                                <td style={{ background: `rgba(50, 100, 50, ${0.7 * value[1] / userIds.length})` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                                <td style={{ background: `rgba(50, 100, 50, ${0.7 * value[2] / userIds.length})` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                                <td style={{ background: `rgba(50, 100, 50, ${0.7 * value[3] / userIds.length})` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                                <td style={{ background: `rgba(50, 100, 50, ${0.7 * value[4] / userIds.length})` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                                <td style={{ background: `rgba(50, 100, 50, ${0.7 * value[5] / userIds.length})` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                                <td style={{ background: `rgba(50, 100, 50, ${0.7 * value[6] / userIds.length})` }} className={'calendar-cell calendar-cell-hover' + (idx % 4 == 0 ? ' calendar-cell-hour' : '')}></td>
                            </tr>
                            : <></>
                    }) : <></>
                }
            </tbody>
        </table>
    );
}

export default CollatedCalendar;