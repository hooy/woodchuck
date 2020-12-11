import React, { FunctionComponent } from 'react';
import { Layer, Stage, Image, Circle } from 'react-konva';
import useImage from 'use-image';
import { Hit, WoodchuckTarget } from './types';


const WoodchuckImage = () => {
    console.log('WoodchuckImage: ')
    const woodchuckPath = require("./woodchuck.svg") as string
    const [image] = useImage(woodchuckPath, 'Anonymous')
    return <Image image={image} x={192} y={192} />
}

export function Woodchuck({ hits }: WoodchuckTarget) {
    return (
        <div>
            <div>
                <Stage width={512} height={512}>
                    <Layer>
                        <WoodchuckImage />
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
   