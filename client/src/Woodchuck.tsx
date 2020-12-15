import React, { useEffect } from 'react';
import { Layer, Stage, Image, Circle } from 'react-konva';
import useImage from 'use-image';
import { Hit, WoodchuckTarget } from './types';


    
export function Woodchuck({ hits }: WoodchuckTarget) {
    const woodchuckPath = '/woodchuck.svg'
    const [image, status] = useImage(woodchuckPath, 'Anonymous')
    
    // useEffect(() => {
    //     console.log(woodchuckPath, image, status);
    // }, [image, status]);

    return (
        <div>
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
            <div>
                {hits.map((hit: Hit, index) => (
                    <p key={index}>x={hit.x} y={hit.y} {index} </p>
                ))}
            </div>
        </div>
    );

}
   