import React, { createRef, useEffect } from 'react';
import { Layer, Stage, Image, Circle } from 'react-konva';
import useImage from 'use-image';
import { Hit, WoodchuckTarget } from './types';


    
export function Woodchuck({ hits }: WoodchuckTarget) {
    const woodchuckPath = '/woodchuck.svg'
    const [image] = useImage(woodchuckPath, 'Anonymous')
    const debugRef = createRef<HTMLDivElement>();

    useEffect(() =>{
        if (debugRef.current !== null) {
            debugRef.current.scrollTo(0, 0);
        }
    })
    return (
        <div className="Woodchuck">
            <div>
                <Stage width={512} height={512}>
                    <Layer>
                        <Image image={image} x={192} y={192} />
                        {hits.map((hit: Hit, index) => (
                            <Circle x={hit.x} y={hit.y} radius={5} fill="green" key={index} />
                        ))}
                    </Layer>
                </Stage>
            </div>
            <div className="Woodchuck-debug" ref={debugRef}>
                <h5>Coords:</h5>
                {hits.slice(0).reverse().map((hit: Hit, index) => (
                    <p key={index}>x={hit.x}, y={hit.y}</p>
                ))}
            </div>
        </div>
    );

}
   