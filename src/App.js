import React from 'react';
import logo from './logo.png';
import { Counter } from './features/counter/Counter';
import './App.css';
import Result from './features/result/Result';


function App() {
  return (
    <div className="App" >
      <header className="App-header" >
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Counter />
        {/* <Result/> */}
      </header>
    </div>
  );
}

export default App;
