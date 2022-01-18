import React from 'react'
import {useState} from 'react'
import CountriesList from '../components/CountriesList'
import dynamic from 'next/dynamic';
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/router'

const MapDrag = dynamic(() => import("../components/MapDrag"), { ssr: false });

const addVenue = () => {
    
    const router = useRouter()
    const { data: session, status } = useSession()

    const [positionParent, setPositionParent] = useState({lat:0,lng:0})
    //console.log('PARENT', positionParent)
    const [formData, setFormData] = useState({})
    const [style, setStyle] = useState([])
    const [venue, setVenue] = useState([]) 
    
    //functions to manipulate the formData object
    const addStyles = (newStyle) => {       
        if (!style.includes(newStyle)) {           
            setStyle(prevState => {return [...prevState, newStyle]})                                
        }
        else{
            const styleData = [...style]
            const filtered = styleData.filter( elem => elem !== newStyle)
            setStyle(filtered)                    
        }                          
    }

    const addVenueType = (newVenueType) => {
        if (!venue.includes(newVenueType)) {           
            const addVenue = [...venue]
            addVenue.push(newVenueType)
            setVenue(addVenue)                     
        }
        else{
            const venueData = [...venue]
            const filtered = venueData.filter( elem => elem !== newVenueType)
            setVenue(filtered)                    
        }                      
    }

    //Submit function - deal with finishing the data structure and send the request to API

    function setFinalVenue(e) {
        e.preventDefault()        

        if (style.length === 0 || venue.length === 0) {
            alert('Please fill all the fields and choose at least one Dance style and/or Venue Type')
            return
        }    
        
        if(positionParent.lat == 0 && positionParent.lng == 0) {
            alert('Please drag the icon on the map to the correct location of this venue')
            return
        }
        
        let userEmail = session.user.email;      
        const finalData = {...formData}        
        
        finalData.postedBy = userEmail
        finalData.latitude = positionParent.lat
        finalData.longitude = positionParent.lng
        finalData.styles = style
        finalData.venueType = venue      
        
        saveVenue(finalData);

        router.push('/submitedVenue')
                
    }
    
    async function saveVenue(data) {     

        const response = await fetch('/api/venues/createVenue', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)            
        })
        
        return await response.json()
    }

    return (
        <>
        {(session && (
        <div>
            <div className="text-gray-800 text-center font-bold text-2xl my-8">Add a new Venue to our Map</div>
                {/* Form */}
                <form className="pt-3 pb-2 md:p-5 max-w-3xl border-2 mx-auto border-gray-300 bg-gray-200 rounded " onSubmit={setFinalVenue} >
                    {/* Venue Name */}
                    <div className="py-3 md:grid md:grid-cols-4 md:gap-x-0.5 md:p-2" >                
                        <label 
                            className="block text-center md:flex md:items-center text-gray-800" >Venue Name
                        </label>                
                        <input 
                            className="block mx-auto w-11/12 m-2 p-1 md:p-2 md:m-0 border-2 border-gray-600 md:col-span-3"
                            type="text" placeholder="Venue name" name="venue-name" onChange={e => setFormData({ ...formData, name:e.target.value })}
                            required />                        
                    </div>
                    {/* Dance Styles */}
                    <div className="px-2 md:grid md:grid-cols-4 md:gap-x-0.5 md:p-2" >                
                        <label 
                            className="underline underline-offset-4 block text-center md:flex md:items-center md:no-underline text-gray-800" >Dance Styles
                        </label>  
                        <div className="flex w-full justify-center md:col-span-3 md:justify-start  py-3">              
                            <input 
                            className="my-2 mx-3"
                            type="checkbox" value="Salsa" name="dance-styles" onChange={e => addStyles(e.target.value)}
                             /> Salsa
                            <input  
                            className="my-2 mx-3"
                            type="checkbox" value="Bachata" name="dance-styles" onChange={e => addStyles(e.target.value)}
                             /> Bachata
                            <input 
                            className="my-2 mx-3"
                            type="checkbox" value="Kizomba" name="dance-styles" onChange={e => addStyles(e.target.value)}
                             /> Kizomba
                        </div>                        
                    </div>
                     {/* Venue type */}
                    <div className="px-2 md:grid md:grid-cols-4 md:gap-x-0.5 md:p-2" >                
                        <label 
                            className="underline underline-offset-4 block text-center md:flex md:items-center md:no-underline text-gray-800" >Venue Type
                        </label>  
                        <div className="flex w-full justify-center md:col-span-3 md:justify-start py-3">              
                            <input 
                            className="my-2 mx-3"
                            type="checkbox" value="Classes" name="venue-type" onChange={e => addVenueType(e.target.value)}
                             /> Classes
                            <input  
                            className="my-2 mx-3"
                            type="checkbox" value="Social" name="venue-type" onChange={e => addVenueType(e.target.value)}
                             /> Social Dance
                            <input 
                            className="my-2 mx-3"
                            type="checkbox" value="Studio" name="venue-type" onChange={e => addVenueType(e.target.value)}
                             /> Practice Studios
                             <input 
                            className="my-2 mx-3"
                            type="checkbox" value="Congress" name="venue-type" onChange={e => addVenueType(e.target.value)}
                             /> Congress
                        </div>
                        
                    </div>
                    {/* Address */}
                    <div className="py-3 md:grid md:grid-cols-4 md:gap-x-0.5 md:p-2" >                
                        <label 
                            className="block text-center md:flex md:items-center text-gray-800" >Address
                        </label>                
                        <input 
                            className="block mx-auto w-11/12 m-2 p-1 md:p-2 md:m-0 border-2 border-gray-600 md:col-span-3"
                            type="text" placeholder="Address ex: 24 Prince st" name="address" onChange={e => setFormData({ ...formData, address:e.target.value })}
                            required />                        
                    </div>
                    {/* City */}
                    <div className="py-3 md:grid md:grid-cols-4 md:gap-x-0.5 md:p-2" >                
                        <label 
                            className="block text-center md:flex md:items-center text-gray-800" >City
                        </label>                
                        <input 
                            className="block mx-auto w-11/12 m-2 p-1 md:p-2 md:m-0 border-2 border-gray-600 md:col-span-3"
                            type="text" placeholder="City" name="city" onChange={e => setFormData({ ...formData, city:e.target.value })}
                            required />                        
                    </div>
                    {/* Country */}
                    <div className="py-2 md:grid md:grid-cols-4 md:gap-x-0.5 md:p-2" >                
                        <label 
                            className="block text-center md:flex md:items-center text-gray-800" >Country
                        </label>   
                        <select className="block mx-auto w-11/12 m-2 p-1 md:p-2 md:m-0 border-2 border-gray-600 md:col-span-3"
                            name="country" onChange={e => setFormData({ ...formData, country:e.target.value })}
                            required
                        >
                            <CountriesList></CountriesList>
                        </select>           
                    </div>
                     {/* PostCode */}
                     <div className="py-3 md:grid md:grid-cols-4 md:gap-x-0.5 md:p-2" >                
                        <label 
                            className="block text-center md:flex md:items-center text-gray-800" >PostCode
                        </label>                
                        <input 
                            className="block mx-auto w-11/12 m-2 p-1 md:p-2 md:m-0 border-2 border-gray-600 md:col-span-3"
                            type="text" placeholder="PostCode" name="postcode" onChange={e => setFormData({ ...formData, postcode:e.target.value })}
                            required />                        
                    </div>
                    
                    {/* Map */}
                    <div className="text-center text-gray-800 text-lg pt-6" >
                        Drag the icon to the Venue location
                    </div>
                    <div className="h-26 mx-auto p-2"> 
                        <MapDrag  setPositionParent={setPositionParent} ></MapDrag>
                    </div>                   

                    {/* Submit Button */}
                    <div className="flex justify-center items-center h-scree py-6">                       
                        <input className="bg-gray-400 border-1 border-gray-600 px-20 py-2 rounded text-center hover:bg-gray-800 hover:text-white" type="submit" value="Submit Venue" ></input>                        
                        
                    </div>
                </form>            
        </div>
        ))}
        {(!session && (
        <div className="h-screen">
            <div className="bg-gray-300 w-4/5 mx-auto mt-20 mb-8 p-10 rounded max-w-xl">
                <div className="text-center font-bold text-xl ">You need to be Sign In to access this page </div>
                
            </div>
            <div className="px-10 md:px-5 py-5 mx-auto ">            
            <div className="px-5 py-3 bg-gray-700 rounded w-32 mx-auto text-white text-center text-xl hover:bg-gray-900 cursor-pointer" > 
                <a className="" onClick={() => signIn()}>Sign In</a>          
            </div>             
          </div>
        </div>
        ))}
        </>
    )
}

export default addVenue
