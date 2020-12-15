import React, { useEffect, useState } from 'react';
import { Hit } from './types';
import './App.css';
import io from 'socket.io-client'
import { Woodchuck } from './Woodchuck';

const socket = io.connect(`http://localhost:5000`, {secure:false})

const App: React.FC = () => {
  const [hits, setHits] = useState([] as Hit[])
  const hitsRef = React.useRef(hits)
    
  useEffect(() => {
      // This effect executes on every render (no dependency array specified).
      // Any change to the "hits" state will trigger a re-render
      // which will then cause this effect to capture the current "hits"
      // value in "hitsRef.current".
      hitsRef.current = hits;
  });

  React.useEffect(() => {
    // This effect only executes on the initial render so that we aren't setting
    // up the socket repeatedly. This means it can't reliably refer to "hits"
    // because once "setHits" is called this would be looking at a stale
    // "hits" reference (it would forever see the initial value of the
    // "hits" state since it isn't in the dependency array).
    // "hitsRef", on the other hand, will be stable across re-renders and 
    // "hitsRef.current" successfully provides the up-to-date value of 
    // "hits" (due to the other effect updating the ref).
    const handler = (hit: Hit) => {setHits([...hitsRef.current, hit])};
    socket.on('coords', handler);
    return () => {
      socket.off('disconnect', handler);
    }
  }, []);

  

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
};

export default App;