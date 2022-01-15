import React from 'react'
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

//Madrid
const position = [40.416775, -3.703790]

function centerOne() {
    return (
        <>
        <Map position={position}></Map>
        </>
    )
}

export default centerOne