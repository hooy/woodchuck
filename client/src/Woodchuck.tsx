import React, { FunctionComponent, useEffect, useState } from 'react';
import { Layer, Stage, Image, Circle } from 'react-konva';
import useImage from 'use-image';
import io from "socket.io-client"
import { Hit, WoodchuckTarget } from './types';


const WoodchuckImage = () => {
    const woodchuckPath = require("./woodchuck.svg") as string;
    const [image] = useImage(woodchuckPath);
    console.log('WoodchuckImage')
    return <Image image={image} x={192} y={192} />;
};

export const Woodchuck:FunctionComponent<WoodchuckTarget> = (initialHits) => {
    const [target, setHits] = useState<WoodchuckTarget>(initialHits);

    let socket = io.connect(`http://localhost:5000`, {secure:false})
    
    const addHit = (hit: Hit) => {
        console.log('addHit', hit);
        target.hits.push(hit);
    }
    useEffect(() => {
        console.log('Component mounted');
        socket.on(`coords`, (hit: Hit) => {
            console.log(hit);
           addHit(hit);
        });
        
        return () => {
            console.log('Component will be unmount')
        }
    });
  
    
  

    return (
        <Stage width={512} height={512}>
            <Layer>
            <WoodchuckImage />
            {target.hits.map((hit: Hit) => (
                <Circle x={hit.x} y={hit.y} radius={5} fill="green" />
            ))}
            </Layer>
        </Stage>
    );

  }
   