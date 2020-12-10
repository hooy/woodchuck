import React, { useState, useEffect, useRef } from 'react';
import io from "socket.io-client"
import woodchuck from './woodchuck.svg'
import { Hit, WoodchuckState } from './types';
import { Stage, Layer, Image, Circle} from 'react-konva';
import useImage from 'use-image';
import './App.css';

let socket = io.connect(`http://localhost:5000`, {secure:false})
interface IProps {}
const WoodchuckImage = () => {
  const [image] = useImage(woodchuck);
  return <Image image={image} x={192} y={192} />;
};

class App extends React.Component<IProps, WoodchuckState> {
  targetCanvasRef: React.RefObject<HTMLCanvasElement>;
  
  constructor(props: IProps) {
    super(props);
    
    this.targetCanvasRef = React.createRef<HTMLCanvasElement>();
    this.state = {
      hits: [{x: 1, y: 1}]
    };
  }

  componentDidMount() {    
    socket.on(`coords`, (h: Hit) => {
      console.log(h)
      this.setState((previousState: { hits: Hit[]; }, hit: Hit) => ({
        hits: [...previousState.hits, h]
      }));
    })
  }

  disconnect() {
    socket.disconnect()
  }

  render () {
    
    return (
      <div className="App">
          <header className="App-header">
              <h1 className="App-title">Woodchuck</h1>
          </header>
          <div className="App-content">
              <div className="Woodchuck">
              <Stage width={512} height={512}>
                <Layer>
                  <WoodchuckImage />
                  {this.state.hits.map((hit: Hit) => (
                    <Circle x={hit.x} y={hit.y} radius={5} fill="green" />
                  ))}
                </Layer>
              </Stage>
              </div>
              <button onClick={this.disconnect}>Disconnect</button>
              {this.state.hits.map((hit: Hit) => (
                <div>{hit.x}, y={hit.y}</div>
              ))}
          </div>
              
      
      </div>
    )
  }
}

export default App;