import React from 'react';
import { Hit } from './types';
import './App.css';
import { Woodchuck } from './Woodchuck';


const App: React.FC = () => {
  {
    const hits: Hit[] = [{x: 100, y: 100}]
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