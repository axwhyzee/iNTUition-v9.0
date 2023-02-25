import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import Mainpage from './components/Mainpage/Mainpage';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/" element={<div><Mainpage /></div>} />
      </Routes>
    </div>
  );
}

export default App;