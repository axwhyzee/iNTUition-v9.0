import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import Addtask from './components/Addtask/Addtask';
import Mainpage from './components/Mainpage/Mainpage';
import { Route, Routes, useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const navigate = useNavigate()
  return (
      <div className="App">
          <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/calendar" element={<Calendar />}/> 
          <Route path="/home" element={<div><Mainpage/><Addtask/></div>}/>
          </Routes>
      </div>
  );
}

export default App;