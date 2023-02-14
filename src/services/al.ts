import { prisma } from "../db/client";
// import userd from "./user"

export default async () => {
const getUserData = async (userId :number) => {
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
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
    });
    return userData;
  };
  
  const calculateLikePercent = (user1:any, user2:any) => {
    const user1Artists = user1.artists.map((artist:any) => artist.name);
    const user2Artists = user2.artists.map((artist:any) => artist.name);
    const artistIntersection = user1Artists.filter((artist:any) => user2Artists.includes(artist));
  
    const user1TopSongs = user1.topSongs.map((song:any) => song.name);
    const user2TopSongs = user2.topSongs.map((song:any) => song.name);
    const topSongIntersection = user1TopSongs.filter((song:any) => user2TopSongs.includes(song));
  
    const intersectionSize = artistIntersection.length + topSongIntersection.length;
    const unionSize = user1Artists.length + user2Artists.length + user1TopSongs.length + user2TopSongs.length;
    const likePercent = intersectionSize / unionSize;
  
    return likePercent;
  };
  
  // Example usage
  const user1 = await getUserData(1);
  const user2 = await getUserData(2);
  const likePercent = calculateLikePercent(user1, user2);
  console.log(`User 1 and User 2 have a ${likePercent * 100}% like percent`);
}