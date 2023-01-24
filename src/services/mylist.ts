// Help me write an algorithm to find match between to users based on their top artists
import { prisma } from "../db/client";
// import userd from "./user"

export default async (access: string, token: any) => {
//   const userDetails = await userd(access);

  const user = await prisma.user.findUnique({
    where: {
      email: token?.email as string,
    },
    select: {
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
  });
  
  return user;
};
