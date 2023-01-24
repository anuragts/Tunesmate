import { prisma } from "../db/client";
// import userd from "./user"

export default async (token:any) => {

  const users = await prisma.user.findMany({
    where:{
        NOT:{
            email:{
                equals:`${token?.email as string}`,
            }
        }
    },
    select: {
        name:true,
        topArtists: {
          select: {
            name: true,
            genres:true,
            popularity:true,
          },
        },
        topTracks: {
          select: {
            name: true,
            artist:true,
          },
        },
      },    
  })
  
  return users;
};
