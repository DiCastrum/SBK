import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default NextAuth({
 
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
          }
        },
        from: process.env.EMAIL_FROM
      }),
      
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      })
  ],

  
  secret: process.env.SECRET,

  session: {
    
    strategy: "jwt",

  },

  
  jwt: {
   
  },

  
  pages: {
   
  },

 
  callbacks: {
    
  },

  
  events: {},

 
  theme: {
    colorScheme: "light",
  },

  
  debug: false,

})