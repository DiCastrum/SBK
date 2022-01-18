import React from 'react';
import { useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import geolocation from './Geolocation'
import { OpenStreetMapProvider } from "leaflet-geosearch";
import SearchControl from "./SearchControl";
import SearchFields from "./SearchFields"
import L from 'leaflet'



var danceIcon = L.icon({
  iconUrl: '/dancePin.png',
  iconSize:     [100, 60], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [50, 60], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const Map = ({position, allVenues, mapId}) => {

  const [activeVenue, setActiveVenue] = useState(null)
  const [venues, setVenues] = useState(allVenues)
  const [danceStyle, setDanceStyle] = useState("")
  const [venueType, setVenueType] = useState("")

  //city search bar
  const prov = new OpenStreetMapProvider({
    params: {
      email: 'castrumcodetest0001@gmail.com', 
    },
  });

  //map location coordinates
  let location;
  (mapId === "map") ? (location = geolocation()) : 
  
  (location = {
    loaded: true,
    coordinates: {
        lat: position[0],
        lng: position[1]}
  })  
    
  //Filtering the Data
  const filtered = (danceS, venueT) => {
    
    if (danceS !== "" && venueT !== "" ) {
      const filteredVenues = venues.filter(venue => (venue.styles.includes(danceS) && venue.venueType.includes(venueT)))
      return filteredVenues
    } 
    
    if (danceS !== "" && venueT === "" ) {
      const filteredVenues = venues.filter(venue => (venue.styles.includes(danceS)))
      return  filteredVenues
    } 
   
    if (danceS === "" && venueT !== "" ) {
      const filteredVenues = venues.filter(venue => (venue.venueType.includes(venueT)))
      return  filteredVenues
    } 
    
    if (danceS === "" && venueT === "" ) return venues
  }

  const filterVenues = (danceS, venueT) => {

    const finalVenues = filtered(danceS, venueT)
    //DELETE THIS CONSOLELOG
    console.log('final VENUE',finalVenues)
    
    return(
    finalVenues.map(venue => (                  
      <Marker
        key={venue.id}
        icon={danceIcon}
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
    )))
  }

  return (
    <div className="md:grid grid-cols-3"> 
      <div className="md:order-3">
        <SearchFields setDanceStyle={setDanceStyle} setVenueType={setVenueType} onSubmit={()=>filterVenues(danceStyle, venueType)} ></SearchFields>
      </div>  
    <div className="col-span-2">

    { location.loaded &&  
    <>     
    <MapContainer  center={[location.coordinates.lat, location.coordinates.lng]} zoom={13} scrollWheelZoom={true}> 
      {/* <img className="rounded-full leaflet-top leaflet-right mr-5 mt-3" src="/danceIcon.png" alt="dance Logo" width={40} height={40}/> */}
             
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <SearchControl
          provider={prov}
          showMarker={true}
          showPopup={false}
          popupFormat={({ query, result }) => result.label}
          maxMarkers={1}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={true}
          searchLabel={"Enter address, please"}
          keepResult={false}
        />

      {filterVenues(danceStyle, venueType)}

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
    }  
    </div>        
    </div>
  )
}



export default Map

