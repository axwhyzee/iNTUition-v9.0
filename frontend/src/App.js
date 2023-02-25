import { Box } from '@mui/system';
import './App.css';
import Addtask from './components/Addtask/Addtask';
import Mainpage from './components/Mainpage/Mainpage';


function App() {

  return (
      <div className="App">
          <Mainpage></Mainpage>
          <Addtask></Addtask>
      </div>
  );
}

export default App;
