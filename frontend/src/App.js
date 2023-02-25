import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import Addtask from './components/Addtask/Addtask';
import Mainpage from './components/Mainpage/Mainpage';

function App() {

  return (
      <div className="App">
          <Navbar />
          <Sidebar />
          <Calendar />
          <Mainpage/>
          <Addtask/>
      </div>
  );
}

export default App;
