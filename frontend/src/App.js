import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import Addtask from './components/Addtask/Addtask';
import Mainpage from './components/Mainpage/Mainpage';
import { Route, Routes} from 'react-router-dom';


function App() {
  
  return (
      <div className="App">
          <Routes>
          <Route path="/calendar" element={<Calendar />}/> 
          <Route path="/" element={<div><Mainpage/><Addtask/></div>}/>
          </Routes>
      </div>
  );
}

export default App;