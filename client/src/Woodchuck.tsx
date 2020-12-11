import React, { FunctionComponent, useEffect, useState } from 'react';
import { Layer, Stage, Image, Circle } from 'react-konva';
import useImage from 'use-image';
import io from "socket.io-client"
import { Hit, WoodchuckTarget } from './types';


const WoodchuckImage = () => {
    console.log('WoodchuckImage: ');
    const woodchuckPath = require("./woodchuck.svg") as string;
    const [image] = useImage(woodchuckPath, 'Anonymous');
    return <Image image={image} x={192} y={192} />;
};

const subscribeToWoodchuckServer = (handler: (hit: Hit) => void) => {
    let socket = io.connect(`http://localhost:5000`, {secure:false})
    socket.on(`coords`, (hit: Hit) => {
        handler(hit);
    });
    return socket;
}

export const Woodchuck:FunctionComponent<WoodchuckTarget> = (initialHits) => {
    const [target, setTarget] = useState<WoodchuckTarget>(initialHits);
    let socket: SocketIOClient.Socket | null = null;

    useEffect(() => {
        console.log('Component mounted');
        function handleTargetChange(hit: Hit) {
            setTarget({ hits: [...target.hits, hit]});
        }
        socket = subscribeToWoodchuckServer(handleTargetChange);
        return function disconnect() {
            console.log('Component will be unmount');
            if (socket) {
                socket.emit('disconnect');
            }
        }
    });

    useEffect(() => {
        console.log('target changed');
    }, [target]);
  
    
  

    return (
        <Stage width={512} height={512}>
            <Layer>
            <WoodchuckImage />
            {target.hits.map((hit: Hit, index) => (
                <Circle x={hit.x} y={hit.y} radius={5} fill="green" key={index} />
            ))}
            </Layer>
        </Stage>
    );

  }
   