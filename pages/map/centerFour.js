import React from 'react'
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

//Barcelona
const position = [41.387773, 2.165789]

function centerOne() {
    return (
        <>
        <Map position={position}></Map>
        </>
    )
}

export default centerOne