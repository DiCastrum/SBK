import React from 'react';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const Map = ({position, allVenues}) => {
  
  const [activeVenue, setActiveVenue] = useState(null)
  const [venues, setVenues] = useState(allVenues)

  return (
    <>        
    <MapContainer center={position} zoom={13} scrollWheelZoom={true}>          
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {venues.map(venue => (            
        <Marker
          key={venue.id}
          position={[
            venue.location[0].latitude,
            venue.location[0].longitude
          ]}
          eventHandlers={{
            click: () => {
              setActiveVenue(venue);                          
              }
          }}  
              
        />                  
      ))}

      {activeVenue && (
        <Popup
          position={[
            activeVenue.location[0].latitude,
            activeVenue.location[0].longitude
          ]}          
          >
          <div>
            <h4>{activeVenue.name}</h4>
            <p>Venue Type: {activeVenue.venueType.map((type, id) => <span key={id}>{type}, </span>)}</p>
            <p>Style: {activeVenue.styles.map((style,id) => <span key={id}>{style}, </span>)}</p>
            <p>Location:{activeVenue.location[0].address}, {activeVenue.location[0].city}, {activeVenue.location[0].country}, {activeVenue.location[0].postcode} </p>
           
          </div>
        </Popup>
      )}

    </MapContainer>
    </>
  )
}



export default Map

