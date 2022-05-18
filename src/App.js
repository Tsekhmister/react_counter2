import React, { useState} from "react";
import { Timer } from './components/Timer';
import './App.css'

function App() {
  const [isTimer, setTimer] = useState(false);

  const handleClick = () => {
    setTimer(!isTimer);
  }

  return (
    <div className="App">
      <h2 className="App__tittle">React Timer</h2>
      {
        !isTimer ? 
          <button onClick={handleClick} className="App__button">Open timer</button>
          :
          <button onClick={handleClick} className="App__button">Close timer</button>
      }
      {isTimer && <Timer />}
    </div>
  );
}

export default App;
