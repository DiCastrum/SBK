import React from 'react'
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

//London
const position = [51.507351, -0.127758]

function centerOne() {
    return (
        <>
        <Map position={position}></Map>
        </>
    )
}

export default centerOne