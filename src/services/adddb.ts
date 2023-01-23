import { prisma } from "../db/client";
import getTracks from "./tracks";
import getArtists from "./artists";
import userd from "./user";

export default async (access: string , token:any) => {
  const topTracks = await getTracks(access);
  const topArtists = await getArtists(access);
  const userDetails = await userd(access);
  const user = await prisma.user.findUnique({
    where: {
      email: token?.email as string,
    },
  });
  if (user) {
    return ("user exists")
  } else {
    const a = await prisma.user.create({
      data: {
        email: token?.email as string,
        name: userDetails.name,
        image_url: userDetails.image,
        url: userDetails.url,
        followers: userDetails.followers,
      },
    });
    const tracks = await prisma.topTracks.createMany({
      data: topTracks.map((track) => ({
        ...track,
        userId: a.id,
      })),
    });
    const artists = await prisma.topArtists.createMany({
      data :topArtists.map((artist) => ({
        ...artist,
        userId: a.id,
      }))
    })
    return ({ user: a, tracks: tracks , artists: artists });
  }
};
