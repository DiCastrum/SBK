import React from 'react'
import Link from 'next/link'
import { useSession, signIn} from "next-auth/react"

const submitedVenue = () => {
    const { data: session } = useSession()
    
    return (
        <>
        {(session && (
        <div className="h-screen">
            <div className="bg-gray-300 w-4/5 mx-auto mt-20 mb-8 p-10 rounded max-w-xl">
                <div className="text-center font-bold text-xl ">Thank you for Submiting a new Venue </div>
                <div className="m-5 text-center text-lg">And help all Dancers around the world to find a new place to dance </div>
            </div>
            <div className="px-10 md:px-5 py-5 mx-auto ">
            <div className="flex justify-center">
            <div className="px-5 py-3 bg-gray-700 rounded w-24  text-white text-center text-xl hover:bg-gray-900 cursor-pointer mr-5" >
                <Link href="/">                            
                    <a className="">Home</a>              
                </Link>
            </div>
            <div className="px-5 py-3 bg-gray-700 rounded w-24 text-white text-center text-xl hover:bg-gray-900 cursor-pointer ml-5" >
                <Link href="/map/map">                            
                    <a className=" ">Map</a>              
                </Link>
            </div>
            </div>
          </div>
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

export default submitedVenue
