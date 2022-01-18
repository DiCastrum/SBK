import React from 'react'
import dynamic from 'next/dynamic';
import {PrismaClient} from '@prisma/client'
import { useRouter } from 'next/router'

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

let position;

export const getStaticPaths = async () => {   

    return {
        paths: [
            {  params: { id: 'map' } },
            {  params: { id: 'madrid' } },
            {  params: { id: 'london' } },
            {  params: { id: 'berlin' } },
            {  params: { id: 'barcelona' } },
            {  params: { id: 'edinburgh' } },
            {  params: { id: 'porto' } }
        ],
      fallback: false 
    };
}

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

function map({allVenues}) {  

    const router = useRouter()
    const mapId  = router.query.id  
      
    //if(mapId === 'map') position = [55.953251, -3.188267]
    if(mapId === 'madrid') position = [40.416775, -3.703790]
    if(mapId === 'london') position = [51.507351, -0.127758]
    if(mapId === 'berlin') position = [52.520008, 13.404954]
    if(mapId === 'barcelona') position = [41.387773, 2.165789]
    if(mapId === 'edinburgh') position = [55.953251, -3.188267]
    if(mapId === 'porto') position = [41.157944, -8.629105]  
       
    
    return (
        <div className="">
            <Map position={position} allVenues={allVenues} mapId={mapId} ></Map>
        </div>
    )
    }
    
    export default map