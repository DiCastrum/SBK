import React from 'react';
import { useState, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';



const center = {
    lat: 55.953251,
    lng: -3.188267,
}

function DraggableMarker() {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
       
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
  
    return (
        <>
        <div>Latitude:{position.lat},Longitude:{position.lng}</div>
        <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />       
            <Marker
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
                <Popup minWidth={90}>
                    <span onClick={toggleDraggable}>
                        {draggable
                        ? 'Marker is draggable'
                        : 'Click here to make marker draggable'}
                    </span>
                </Popup>
            </Marker>
        </MapContainer>
        </>
    )
}



const MapDrag = () => {
      return (
        <>                    
        <DraggableMarker />        
        </>
    )
}

export default MapDrag