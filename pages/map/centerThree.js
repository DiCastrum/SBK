import React from 'react'
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

//Berlin
const position = [52.520008, 13.404954]

function centerOne() {
    return (
        <>
        <Map position={position}></Map>
        </>
    )
}

export default centerOne