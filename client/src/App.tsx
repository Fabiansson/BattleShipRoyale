import React from 'react';
import './App.css';
import WelcomeCard from "./components/WelcomeCard";
import Battleground from './components/Battleground';
import Chat from "./components/Chat";

function App() {
  return (
    <div className="App">
     {/* <header className="App-header">
      </header> */}
      <WelcomeCard />
      <Battleground />
      <Chat />
    </div>
  );
}

export default App;
