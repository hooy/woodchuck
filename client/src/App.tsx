import React, { useState } from 'react';
import { Hit } from './types';
import './App.css';
import io from 'socket.io-client'
import { Woodchuck } from './Woodchuck';

const socket = io.connect(`http://localhost:5000`, {secure:false})

const App: React.FC = () => {
  let [hits, setHits] = useState([] as Hit[])
  socket.on(`coords`, (hit: Hit) => {
    console.log(hits);
    setHits([...hits, hit])
  });

  {
    return (
      <div className="App">
          <header className="App-header">
              <h1 className="App-title">Woodchuck</h1>
          </header>
          <div className="App-content">
              <div className="Woodchuck">
               <Woodchuck hits={hits}/>
              </div>
          </div>
      </div>
    );
  }
};

export default App;