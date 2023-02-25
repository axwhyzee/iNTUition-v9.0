import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';
import Sidebar from './components/Sidebar/Sidebar';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Calendar />
    </div>
  );
}

export default App;
