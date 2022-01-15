import React from 'react'
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

const position = [55.953251, -3.188267]

function map() {
    return (
        <>
        <Map position={position}></Map>
        </>
    )
}

export default map
