import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//POST API to create a new venue data

export default async function (req, res) {

  console.log(req.body);
  
  const { name, styles, venueType, postedBy, latitude, longitude, address, city, country, postcode } = req.body;
  

  try {     
    const newVenue = await prisma.venue.create({ 
      data:{ 
            name,
            styles,
            venueType,
            postedBy
          } 
    });

    const newLocation = await prisma.location.create({ 
      data:{ 
            latitude: +latitude,
            longitude: +longitude,
            address,
            city,
            country,
            postcode,
            venue: { connect: { id: newVenue.id } }           
          } 
    }); 
    
    res.status(201);
    res.json({ newVenue });
  } catch (e) {
    console.error(e);

    res.status(500);
    res.json({ error: "Sorry unable to save the venue to database" });
  } 
}