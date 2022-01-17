import React from 'react';
import { useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';



const center = {
    lat: 55.953251,
    lng: -3.188267,
}

const MapDrag = ({setPositionParent}) => {

  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
        
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
            setPositionParent(marker.getLatLng())            
          }
        },
      }),
      [],
    )     

  return (
    <>
      <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />       
        <Marker
          draggable
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}>
        </Marker>
      </MapContainer>
    </>
  )
}

export default MapDrag