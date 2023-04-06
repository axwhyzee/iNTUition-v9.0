import * as dotenv from 'dotenv';
import XMLHttpRequest from 'xhr2';

dotenv.config();
const JIRAJI_BOT_KEY = process.env.JIRAJI_BOT_KEY;

const chat_id = '-1001845261817';
const message = `Meeting set!\nTitle of meeting: BC2407 Meeting\nMeeting Date: 28/02/2023\nMeeting time: 3pm`;
const url = `https://api.telegram.org/bot${JIRAJI_BOT_KEY}/sendMessage?chat_id=${chat_id}&text=${message}`;
const xht = new XMLHttpRequest();
xht.open("GET", url);
xht.send();