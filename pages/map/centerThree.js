import React from 'react'
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

//Berlin
const position = [52.520008, 13.404954]

//Fetch all venues
export async function getStaticProps() {
    const prisma = new PrismaClient()
    const allVenues = await prisma.venue.findMany({select: {
      id: true,
      name: true,
      styles: true,
      venueType: true,
      postedBy: true,
      location: true,
      }
  })  
    return {
      props :  {allVenues} 
    }
  }

function centerOne({allVenues}) {
    return (
        <div className="bg-gray-800">
            <Map position={position}></Map>
        </div>
    )
}

export default centerOne