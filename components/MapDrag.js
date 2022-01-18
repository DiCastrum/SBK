import React from 'react';
import { useState, useRef, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import geolocation from './Geolocation'
import { OpenStreetMapProvider } from "leaflet-geosearch";
import SearchControl from "./SearchControl";
//import L from 'leaflet'


const MapDrag = ({setPositionParent}) => { 

  const [check, setCheck] = useState(true)

  const [position, setPosition] = useState({
    loaded: false,
    coordinates: {
        lat: 0,
        lng: 0}
  })

  const markerRef = useRef(null)    
  
  const eventHandlers = useMemo(
    () => ({
      dragend() {        
        const marker = markerRef.current
        if (marker !== null) {
          const local = marker.getLatLng()   
          setPosition({
            loaded: true,
            coordinates: {
                lat: local.lat,
                lng: local.lng}
          })          
          setPositionParent(marker.getLatLng())        
        }
      },
    }),
    [],
  )     
  
  const location = geolocation()

  useEffect(() => {
    setPosition(location)
    setCheck(false)
  }, [location.loaded, check])
  
  const prov = new OpenStreetMapProvider({
    params: {
      email: 'castrumcodetest0001@gmail.com', 
    },
  });   

  // const geoMove = () => {
  //   console.log('You Clicked ME')
  //   const center = [location.coordinates.lat, location.coordinates.lng]
  //   const marker = markerRef.current
  //   if (marker !== null) {
  //     marker.flyTo(center, 10);
    
  // }}
  
  

  return (
    <>        
      { position.loaded &&
      <MapContainer center={[position.coordinates.lat, position.coordinates.lng]} zoom={8} scrollWheelZoom={true} classNames='map'>
        {/* <button onClick={geoMove} className="refreshButton"><img src={'/globe.png'} className='ml-1' alt="dance Logo" width={40} height={40} ></img></button> */}
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
        <Marker
          draggable
          eventHandlers={eventHandlers}
          position={[position.coordinates.lat, position.coordinates.lng]}
          ref={markerRef}> 
        </Marker>        
      </MapContainer>      
       }        
    </>
  )
}

export default MapDrag