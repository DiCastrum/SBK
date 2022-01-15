import React from 'react';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import dance from '../dancedata.json'

console.log(dance)

//const position = [55.953251, -3.188267]
//const [position, setPosition] = useState(null)

const Map = ({position}) => {
  const [activeVenue, setActiveVenue] = useState(null)

  return (
    <>        
    <MapContainer center={position} zoom={13} scrollWheelZoom={true}>          
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {dance.map(venue => (            
        <Marker
          key={venue.id}
          position={[
            venue.location.latitude,
            venue.location.longitude
          ]}
          eventHandlers={{
            click: () => {
              setActiveVenue(venue);                          
              }
          }}  
              
        />                  
      ))}

      {activeVenue && (
        console.log(activeVenue.name),
        <Popup
          position={[
            activeVenue.location.latitude,
            activeVenue.location.longitude
          ]}          
          >
          <div>
            <h4>{activeVenue.name}</h4>
            <p>{activeVenue.venue}</p>
            <p>Style:{activeVenue.style}</p>
            <p>Location:{activeVenue.location.adress}, {activeVenue.location.city}, {activeVenue.location.country}, {activeVenue.location.postcode} </p>
            <p>Contact:{activeVenue.contact}</p>
          </div>
        </Popup>
      )}

    </MapContainer>
    </>
  )
}

export default Map