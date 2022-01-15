import React from 'react'
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

//Porto
const position = [41.157944, -8.629105]

function centerOne() {
    return (
        <>
        <Map position={position}></Map>
        </>
    )
}

export default centerOne